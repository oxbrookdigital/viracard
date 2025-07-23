// auth.ts

import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // The signIn callback runs when a user first signs in.
    // This is the perfect place to create their profile in our database.
    async signIn({ user, account }) {
      if (!user.email || !account?.providerAccountId) {
        return false; // Prevent sign-in if essential info is missing
      }
      
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Check if a profile already exists for this user
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", account.providerAccountId) // Look up by Google ID
        .single();

      // If no profile exists, create one
      if (!profile) {
        // Generate a unique username from the email
        const base_username = user.email.split('@')[0];
        const { data: usernameProfile } = await supabase.from('profiles').select('username').eq('username', base_username).single();
        const final_username = usernameProfile ? `${base_username}${Math.floor(Math.random() * 1000)}` : base_username;

        const { error } = await supabase.from("profiles").insert({
          id: account.providerAccountId, // Use the Google ID as the primary key
          email: user.email,
          full_name: user.name,
          avatar_url: user.image,
          username: final_username, // Set the auto-generated username
          onboarding_complete: false, // Default to false
        });

        if (error) {
          console.error("Error creating profile:", error);
          return false; // Prevent sign-in if profile creation fails
        }
      }
      return true; // Allow the sign-in
    },
    
    // The jwt callback populates the session token
    async jwt({ token, account }) {
      if (account) {
        // On sign-in, put the Google ID into the token's 'sub' (subject) claim
        token.sub = account.providerAccountId;
      }
      return token;
    },

    // The session callback populates the client-side session object
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub; // The user ID is now the Google ID
      }
      return session;
    },
  },
};