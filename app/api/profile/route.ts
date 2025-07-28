// app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// --- GET Handler for Public Profiles ---
// This handles requests like GET /api/profile?username=johndoe
export async function GET(request: NextRequest) {
  try {
    // Get the username from the URL's query string
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile, error } = await supabase
      .from("profiles")
      // FIX: Added 'id' to the selection list
      .select("id, full_name, tagline, avatar_url, social_links, username")
      .eq("username", username)
      .single();

    if (error || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);

  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}


// --- PATCH Handler for Updating Own Profile ---
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
      console.error("Supabase update error:", error)
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