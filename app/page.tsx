// app/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";

export default async function Home() {
  // Check for a session on the server
  const session = await getServerSession(authOptions);

  // If a session exists, redirect to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If no session, show the new sign-in form
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <SignInForm />
    </main>
  );
}
