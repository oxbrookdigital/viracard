// app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const profileUpdateSchema = z.object({
  tagline: z.string().max(100).optional(),
  socialLinks: z.array(z.object({
    id: z.string(),
    platform: z.enum(['instagram', 'tiktok', 'youtube', 'x']),
    username: z.string().max(50),
    followers: z.string().max(20),
  })).max(4).optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // --- THIS IS YOUR DEBUGGING STEP ---
    console.log("Attempting to update profile for user ID:", userId);
    // ------------------------------------

    const body = await request.json();
    const validatedData = profileUpdateSchema.parse(body);
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        tagline: validatedData.tagline,
        social_links: validatedData.socialLinks,
        onboarding_complete: true,
      })
      .eq("id", userId); 

    if (error) {
      console.error("Supabase update error:", error);
      throw new Error("Could not update profile in the database.");
    }

    return NextResponse.json({ message: "Profile updated successfully!" });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data provided.", details: error.errors }, { status: 400 });
    }
    console.error("An unexpected error occurred in PATCH /api/profile:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}