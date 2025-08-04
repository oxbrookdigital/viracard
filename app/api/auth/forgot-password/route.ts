// app/api/auth/forgot-password/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// The schema is correct, it expects a string that is a valid email.
const emailSchema = z.string().email("Invalid email address.");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // --- THIS IS THE FIX ---
    // We assign the validated string directly to 'email', instead of destructuring.
    const email = emailSchema.parse(body.email);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // This is the Supabase function to send a password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXTAUTH_URL}/reset-password`,
    });

    if (error) {
      console.error("Supabase password reset error:", error);
      // Don't reveal specific database errors to the client for security.
      // We'll return a generic message, but log the specific error on the server.
      throw new Error("Could not send password reset email.");
    }

    return NextResponse.json({ message: "Password reset link sent successfully." });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If the email is invalid, return the Zod error message.
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    // For all other errors, return a generic message.
    console.error("Forgot password API error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}