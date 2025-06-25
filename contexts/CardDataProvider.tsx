// contexts/CardDataProvider.tsx

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import type { CardData, SocialLink } from '@/app/(main)/dashboard/page';

// Define the shape of our context
type CardDataContextType = {
  cardData: CardData;
  handleTaglineChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // <-- ADDED THIS LINE
  handleAddSocialLink: () => void;
  handleRemoveSocialLink: (id: string) => void;
  handleSocialLinkChange: (id: string, field: keyof SocialLink, value: string) => void;
};

const CardDataContext = createContext<CardDataContextType | undefined>(undefined);

// Create the Provider component
export function CardDataProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  const [cardData, setCardData] = useState<CardData>({
    name: "",
    tagline: "Your catchy tagline here!",
    socialLinks: [],
  });

  useEffect(() => {
    if (session?.user?.name) {
      setCardData(prev => ({ ...prev, name: session.user.name! }));
    }
  }, [session]);

  // --- ADD THIS FUNCTION ---
  const handleTaglineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, tagline: e.target.value }));
  };
  // -------------------------

  const handleAddSocialLink = () => {
    setCardData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { id: Date.now().toString(), platform: 'instagram', username: '', followers: '' }] }));
  };

  const handleRemoveSocialLink = (id: string) => {
    setCardData(prev => ({ ...prev, socialLinks: prev.socialLinks.filter(link => link.id !== id) }));
  };

  const handleSocialLinkChange = (id: string, field: keyof SocialLink, value: string) => {
    setCardData(prev => ({ ...prev, socialLinks: prev.socialLinks.map(link => link.id === id ? { ...link, [field]: value } : link) }));
  };

  // --- ADD THE FUNCTION TO THE VALUE OBJECT ---
  const value = { cardData, handleTaglineChange, handleAddSocialLink, handleRemoveSocialLink, handleSocialLinkChange };

  return <CardDataContext.Provider value={value}>{children}</CardDataContext.Provider>;
}

// Create a custom hook for easy access to the context
export function useCardData() {
  const context = useContext(CardDataContext);
  if (context === undefined) {
    throw new Error('useCardData must be used within a CardDataProvider');
  }
  return context;
}