// app/(main)/dashboard/DashboardClient.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import OnboardingForm from "@/components/dashboard/OnboardingForm";
import CardPreview from "@/components/dashboard/CardPreview";
import { CardDataProvider } from "@/contexts/CardDataProvider";

// Types for your data structures
export type Profile = {
  id: string;
  onboarding_complete: boolean;
  tagline: string | null;
  social_links: any | null; 
  full_name: string | null;
  username: string | null; // Add username to the profile type
} | null;

export type SocialLink = {
  id: string; 
  platform: 'instagram' | 'tiktok' | 'youtube' | 'x';
  username: string;
  followers: string;
};

export type CardData = {
  name: string;
  tagline: string;
  socialLinks: SocialLink[];
};


export default function DashboardClient({ initialProfile }: { initialProfile: Profile }) {
  
  const [showOnboarding, setShowOnboarding] = useState(!initialProfile?.onboarding_complete);

  return (
    <CardDataProvider initialProfile={initialProfile}>
      <main className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {showOnboarding ? (
            // --- ONBOARDING VIEW ---
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <OnboardingForm />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <CardPreview />
                </div>
              </div>
            </div>
          ) : (
            // --- COMPLETED DASHBOARD VIEW (WITH NEW BUTTONS) ---
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">Welcome Back!</h1>
                  <p className="mt-2 text-gray-600">Here is your current ViraCard:</p>
                </div>
                {/* Sign Out Button */}
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 flex-shrink-0"
                >
                  Sign Out
                </button>
              </div>
              <div className="mt-6 max-w-sm mx-auto">
                <CardPreview />
              </div>
              <div className="text-center mt-8 flex flex-col sm:flex-row justify-center gap-3">
                {/* Edit Profile Button */}
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
                >
                  Edit Profile
                </button>
                {/* View Public Card & Full Profile Buttons */}
                <Link 
                  href={`/${initialProfile?.username}`} 
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                  View Public Card
                </Link>
                <Link 
                  href={`/${initialProfile?.username}/full`} 
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </CardDataProvider>
  );
}