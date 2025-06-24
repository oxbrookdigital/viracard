// next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * The `session` object is extended to include a user ID property.
     */
    interface Session {
        user: {
            id: string; // The user's unique ID from the provider
        } & DefaultSession["user"];
    }
}