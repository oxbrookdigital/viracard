// app/(main)/dashboard/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import DashboardClient from "./DashboardClient"; // Import our client component

// This is an async Server Component
export default async function DashboardPage() {
  // 1. Get the session to find the user's ID
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    // This should not happen due to middleware, but it's a good safeguard
    redirect("/");
  }

  // 2. Fetch the user's full profile from Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, onboarding_complete") // Select all fields including our flag
    .eq("id", session.user.id)
    .single();

  // 3. Render the Client Component and pass the fetched profile data as a prop
  return <DashboardClient initialProfile={profile} />;
}