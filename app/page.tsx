// app/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import AuthButtons from "@/components/auth/AuthButtons";

export default async function Home() {
  // Check for a session on the server
  const session = await getServerSession(authOptions);

  // If a session exists, redirect to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If no session, show the public landing page
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <div>
        <h1 className="text-4xl font-bold">Your Influencer Profile. Polished.</h1>
        <p className="mt-4 text-lg text-gray-600">
          The Linktree-killer for creators who mean business.
        </p>
        <div className="mt-8">
          <AuthButtons />
        </div>
      </div>
    </main>
  );
}
