// contexts/CardDataProvider.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { CardData, SocialLink, Profile } from '@/app/(main)/dashboard/DashboardClient';

// Define the shape of our context
type CardDataContextType = {
  cardData: CardData;
  handleTaglineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddSocialLink: () => void;
  handleRemoveSocialLink: (id: string) => void;
  handleSocialLinkChange: (id: string, field: keyof SocialLink, value: string) => void;
};

const CardDataContext = createContext<CardDataContextType | undefined>(undefined);

export function CardDataProvider({ children, initialProfile }: { children: ReactNode; initialProfile: Profile }) {
  const [cardData, setCardData] = useState<CardData>({
    name: initialProfile?.full_name || 'Your Name',
    tagline: initialProfile?.tagline || '',
    socialLinks: initialProfile?.social_links || [],
  });

  const handleTaglineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, tagline: e.target.value }));
  };

  const handleAddSocialLink = () => {
    setCardData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { id: Date.now().toString(), platform: 'instagram', username: '', followers: '' }] }));
  };

  const handleRemoveSocialLink = (id: string) => {
    // FIXED: Explicitly type 'link' as SocialLink
    setCardData(prev => ({ ...prev, socialLinks: prev.socialLinks.filter((link: SocialLink) => link.id !== id) }));
  };

  const handleSocialLinkChange = (id: string, field: keyof SocialLink, value: string) => {
    // FIXED: Explicitly type 'link' as SocialLink
    setCardData(prev => ({ ...prev, socialLinks: prev.socialLinks.map((link: SocialLink) => (link.id === id ? { ...link, [field]: value } : link)) }));
  };

  const value = { cardData, handleTaglineChange, handleAddSocialLink, handleRemoveSocialLink, handleSocialLinkChange };

  return <CardDataContext.Provider value={value}>{children}</CardDataContext.Provider>;
}

export function useCardData() {
  const context = useContext(CardDataContext);
  if (context === undefined) {
    throw new Error('useCardData must be used within a CardDataProvider');
  }
  return context;
}