// auth.ts

import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from '@supabase/supabase-js';

// This is a simplified version of the manual Supabase interaction from the example.
// It ensures that when a user signs in, we have a way to interact with their profile.
async function getSupabaseAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Missing Supabase URL or Service Role Key");
    }
    // The createClient function is used to interact with Supabase
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });
}


export const authOptions: NextAuthOptions = {
    // The example provided uses TwitterProvider; we will use GoogleProvider as requested.
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    // 'offline' access type is requested to get a refresh token, similar to the example
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
    ],
    // The session strategy is set to JWT, matching the provided example
    session: {
        strategy: "jwt",
    },
    // Custom callbacks are used to control the JWT and session objects
    callbacks: {
        // The jwt callback is triggered on sign-in and when session is accessed
        async jwt({ token, account }) {
            // Persist the access_token and refresh_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token; // Handle storing this securely
                token.sub = account.providerAccountId; // Ensure the user's provider ID is in the token
            }
            return token;
        },
        // The session callback is triggered when a session is checked
        async session({ session, token }) {
            // Add custom properties to the session object to make them available on the client
            if (token.sub) {
                session.user.id = token.sub; // Add the user's unique ID from the provider to the session
            }
            return session;
        },
    },
};