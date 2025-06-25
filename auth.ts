// auth.ts

import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

export const authOptions: NextAuthOptions = {
  // We no longer use an adapter.
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // We explicitly use the JWT strategy. This is now the source of truth.
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // The 'jwt' callback is the heart of our new strategy.
    async jwt({ token, account, user }) {
      // On the initial sign-in, the 'account' object is available.
      if (account && user) {
        // This is the bridge between NextAuth and Supabase
        // We use the id_token from Google to sign the user into Supabase
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: account.id_token!,
        });

        if (error) {
          console.error("Supabase signInWithIdToken error:", error);
        } else if (data.session) {
          // If Supabase sign-in is successful, we get a Supabase session
          // We can add the Supabase access token and user ID to our NextAuth JWT
          token.supabaseAccessToken = data.session.access_token;
          token.sub = data.user.id; // This is the REAL Supabase Auth User UUID
        }
      }
      return token;
    },

    // The 'session' callback passes data from the JWT to the client-side session object
    async session({ session, token }) {
      // We pass the Supabase access token and the correct user ID to the session
      (session as any).supabaseAccessToken = token.supabaseAccessToken;
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};