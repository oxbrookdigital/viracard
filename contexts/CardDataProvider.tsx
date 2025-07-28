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
  handleCancel: () => void; // <-- 1. Add the handleCancel function to the type
};

const CardDataContext = createContext<CardDataContextType | undefined>(undefined);

// 2. Update the props to accept the handleCancel function
export function CardDataProvider({ 
  children, 
  initialProfile, 
  handleCancel 
}: { 
  children: ReactNode; 
  initialProfile: Profile; 
  handleCancel: () => void; 
}) {
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
    setCardData(prev => ({ ...prev, socialLinks: prev.socialLinks.filter((link: SocialLink) => link.id !== id) }));
  };

  const handleSocialLinkChange = (id: string, field: keyof SocialLink, value: string) => {
    setCardData(prev => ({ ...prev, socialLinks: prev.socialLinks.map((link: SocialLink) => (link.id === id ? { ...link, [field]: value } : link)) }));
  };

  // 3. Add the handleCancel function to the value object passed to the provider
  const value = { cardData, handleTaglineChange, handleAddSocialLink, handleRemoveSocialLink, handleSocialLinkChange, handleCancel };

  return <CardDataContext.Provider value={value}>{children}</CardDataContext.Provider>;
}

export function useCardData() {
  const context = useContext(CardDataContext);
  if (context === undefined) {
    throw new Error('useCardData must be used within a CardDataProvider');
  }
  return context;
}