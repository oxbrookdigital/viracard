// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * This extends the built-in session to include your custom properties.
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /**
   * This extends the built-in token to include your custom properties.
   */
  interface JWT {
    profileId?: string;
    email?: string;
  }
}