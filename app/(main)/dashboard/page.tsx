// app/(main)/dashboard/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import OnboardingForm from "@/components/dashboard/OnboardingForm";
import CardPreview from "@/components/dashboard/CardPreview";

// Define the shape of a single social link
export type SocialLink = {
  id: string; // A unique ID for React's key prop, e.g., timestamp
  platform: 'instagram' | 'tiktok' | 'youtube' | 'x';
  username: string;
  followers: string; // Stored as string to handle empty inputs
};

// Update the main card data type
export type CardData = {
  name: string;
  tagline: string;
  socialLinks: SocialLink[];
};

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [cardData, setCardData] = useState<CardData>({
    name: "",
    tagline: "Your catchy tagline here!",
    socialLinks: [], // Initialize as an empty array
  });

  // Effect to update card name when session loads
  useEffect(() => {
    if (session?.user?.name) {
      setCardData(prevData => ({ ...prevData, name: session.user.name! }));
    }
  }, [session]);

  // --- Handlers for managing the socialLinks array ---

  const handleAddSocialLink = () => {
    setCardData(prev => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { id: Date.now().toString(), platform: 'instagram', username: '', followers: '' }
      ]
    }));
  };

  const handleRemoveSocialLink = (id: string) => {
    setCardData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };

  const handleSocialLinkChange = (id: string, field: keyof SocialLink, value: string) => {
    setCardData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => 
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };


  if (status === "loading") return <p className="text-center p-24">Loading...</p>;
  if (status === "unauthenticated") return <p className="text-center p-24">Access Denied. Please sign in.</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <OnboardingForm 
            cardData={cardData} 
            onAdd={handleAddSocialLink}
            onRemove={handleRemoveSocialLink}
            onChange={handleSocialLinkChange}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <CardPreview cardData={cardData} />
          </div>
        </div>

      </div>
    </main>
  );
}