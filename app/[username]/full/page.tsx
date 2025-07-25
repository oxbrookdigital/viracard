// app/[username]/full/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FullProfileView from "@/components/profile/FullProfileView"; // <-- Import our new component

export default function FullProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/profile?username=${username}`);
          if (!response.ok) {
            throw new Error("Profile not found");
          }
          const data = await response.json();
          setProfile(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return <p className="text-center p-24 font-semibold">Loading full profile...</p>;
  }

  if (error) {
    return <p className="text-center p-24 font-semibold text-red-500">Error: {error}</p>;
  }
  
  if (!profile) {
    return <p className="text-center p-24 font-semibold">Profile could not be found.</p>;
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Replace the <pre> tag with our new component */}
        <FullProfileView profile={profile} />
      </div>
    </main>
  );
}