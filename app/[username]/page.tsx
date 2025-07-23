// app/[username]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PublicCard from "@/components/profile/PublicCard";

type CardData = {
  name: string;
  tagline: string;
  socialLinks: any[];
};

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          // --- THIS IS THE ONLY CHANGE IN THIS FILE ---
          // We now fetch from /api/profile?username=...
          const response = await fetch(`/api/profile?username=${username}`);
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Profile not found");
          }

          const profile = await response.json();
          setCardData({
            name: profile.full_name || 'User',
            tagline: profile.tagline || '',
            socialLinks: profile.social_links || [],
          });
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [username]);

  if (loading) return <p className="text-center p-24 font-semibold">Loading Profile...</p>;
  if (error) return <p className="text-center p-24 font-semibold text-red-500">Error: {error}</p>;
  if (!cardData) return <p className="text-center p-24 font-semibold">Profile could not be loaded.</p>;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <PublicCard cardData={cardData} />
    </main>
  );
}