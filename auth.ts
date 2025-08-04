// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) return null;
        
        return { 
          id: data.user.id, 
          email: data.user.email!, 
          name: data.user.user_metadata?.full_name || null
        };
      },
    }),
  ],

  session: { strategy: "jwt" as const },

  callbacks: {
    async signIn({ user, account }: any) {
      if (!user.email || !account) return false;
      
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!, 
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      
      try {
        // Determine the provider user ID
        const providerUserId = account.provider === 'google' 
          ? account.providerAccountId! 
          : user.id;

        // Check if this auth provider is already linked
        const { data: authLink } = await supabase
          .from('user_auth_providers')
          .select('user_id')
          .eq('provider', account.provider)
          .eq('provider_user_id', providerUserId)
          .single();

        if (authLink) {
          // Existing user - update the user object with internal ID
          user.id = authLink.user_id;
          return true;
        }

        // Check if email already exists (user might be signing in with different provider)
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', user.email)
          .single();

        let profileId: string;

        if (existingProfile) {
          // Email exists - link this new provider to existing profile
          profileId = existingProfile.id;
        } else {
          // Create new profile
          const baseUsername = user.email.split('@')[0].toLowerCase();
          
          // Generate unique username
          const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .ilike('username', `${baseUsername}%`);
          
          const username = count && count > 0 
            ? `${baseUsername}${count + 1}`
            : baseUsername;
          
          const { data: newProfile, error: profileError } = await supabase
            .from('profiles')
            .insert({
              email: user.email,
              full_name: user.name || null,
              avatar_url: user.image || null,
              username: username,
            })
            .select('id')
            .single();

          if (profileError || !newProfile) {
            console.error('Profile creation error:', profileError);
            throw new Error("Could not create new profile during sign-in.");
          }
          
          profileId = newProfile.id;
        }
        
        // Link the auth provider
        const { error: linkError } = await supabase
          .from('user_auth_providers')
          .insert({
            user_id: profileId,
            provider: account.provider,
            provider_user_id: providerUserId,
          });

        if (linkError) {
          console.error('Auth provider linking error:', linkError);
          throw new Error("Could not link auth provider.");
        }

        // Update the user object with the internal profile ID
        user.id = profileId;
        
        return true;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return false;
      }
    },
    
    async jwt({ token, user }: any) {
      if (user) {
        // user.id is now our internal profile ID
        token.profileId = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        // Use profileId as the user ID throughout your app
        session.user.id = token.profileId as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};