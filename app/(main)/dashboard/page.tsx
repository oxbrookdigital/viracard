// app/(main)/dashboard/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import OnboardingForm from "@/components/dashboard/OnboardingForm";
import CardPreview from "@/components/dashboard/CardPreview";

type CardData = {
  name: string;
  tagline: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [cardData, setCardData] = useState<CardData>({
    name: "",
    tagline: "Your catchy tagline here!",
  });

  // Effect to update card name when session loads
  useEffect(() => {
    if (session?.user?.name) {
      setCardData(prevData => ({ ...prevData, name: session.user.name! }));
    }
  }, [session]);


  if (status === "loading") {
    return <p className="text-center p-24">Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p className="text-center p-24">Access Denied. Please sign in.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Pass state and the update function to the form */}
        <div className="lg:col-span-2">
          <OnboardingForm cardData={cardData} setCardData={setCardData} />
        </div>

        {/* Column 2: Pass state data to the preview card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <CardPreview cardData={cardData} />
          </div>
        </div>

      </div>
    </main>
  );
}