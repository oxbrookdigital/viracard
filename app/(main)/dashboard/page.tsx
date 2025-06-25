// app/(main)/dashboard/page.tsx

"use client";

import OnboardingForm from "@/components/dashboard/OnboardingForm";
import CardPreview from "@/components/dashboard/CardPreview";
import { CardDataProvider } from "@/contexts/CardDataProvider"; // Import the provider we will use

// Exporting these types from here allows other components to import them easily.
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


export default function DashboardPage() {
  return (
    // We wrap everything in the CardDataProvider.
    // This provider now manages all the state and logic.
    <CardDataProvider>
      <main className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            {/* The form no longer needs any props passed to it */}
            <OnboardingForm /> 
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* The preview card no longer needs any props passed to it */}
              <CardPreview />
            </div>
          </div>

        </div>
      </main>
    </CardDataProvider>
  );
}