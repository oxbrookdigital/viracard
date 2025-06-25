// next-auth.d.ts

import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"; // Import JWT

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Add this new declaration for the JWT
declare module "next-auth/jwt" {
  interface JWT {
    supabaseAccessToken?: string;
  }
}