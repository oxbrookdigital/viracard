// app/(main)/dashboard/DashboardClient.tsx

"use client";

import { useState } from "react";
import OnboardingForm from "@/components/dashboard/OnboardingForm";
import CardPreview from "@/components/dashboard/CardPreview";
import { CardDataProvider } from "@/contexts/CardDataProvider";

// --- ACTION: Add 'export' to these type definitions ---
export type Profile = {
  id: string;
  onboarding_complete: boolean;
  tagline: string | null;
  social_links: any | null; 
  full_name: string | null;
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
// ----------------------------------------------------


// The main component now accepts the initial profile data as a prop
export default function DashboardClient({ initialProfile }: { initialProfile: Profile }) {
  
  // We can determine the initial view based on the server-fetched data
  const [showOnboarding, setShowOnboarding] = useState(!initialProfile?.onboarding_complete);

  return (
    // The Context Provider still manages all the interactive state
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
            // --- COMPLETED DASHBOARD VIEW ---
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="mt-2 text-gray-600">Here is your current ViraCard:</p>
              <div className="mt-6 max-w-sm mx-auto">
                <CardPreview />
              </div>
              <div className="text-center mt-6">
                 {/* This button will re-open the onboarding form */}
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </CardDataProvider>
  );
}