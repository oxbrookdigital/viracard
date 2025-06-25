// components/dashboard/OnboardingForm.tsx

"use client";

import React from 'react';
import type { CardData, SocialLink } from '@/app/(main)/dashboard/page';

type OnboardingFormProps = {
  cardData: CardData;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof SocialLink, value: string) => void;
};

export default function OnboardingForm({ cardData, onAdd, onRemove, onChange }: OnboardingFormProps) {
  // We no longer need the top-level handleChange, it's handled by the props now.

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Edit Your Card</h2>
      <p className="mt-2 text-gray-500 mb-6">
        Add your social platforms and see your card update in real-time.
      </p>

      <div className="space-y-6">
        {/* We can add tagline and other fields back here if needed */}
        
        {/* --- Social Links Section --- */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Social Platforms</h3>
          <div className="mt-4 space-y-4">
            {cardData.socialLinks.map((link) => (
              <div key={link.id} className="grid grid-cols-1 md:grid-cols-8 gap-3 p-4 border rounded-md">
                {/* Platform Select */}
                <select 
                  name="platform"
                  value={link.platform}
                  onChange={(e) => onChange(link.id, 'platform', e.target.value)}
                  className="md:col-span-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="x">X (Twitter)</option>
                </select>
                
                {/* Username Input */}
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={link.username}
                  onChange={(e) => onChange(link.id, 'username', e.target.value)}
                  className="md:col-span-3 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Followers Input */}
                <input
                  type="text"
                  name="followers"
                  placeholder="Followers (e.g., 10.5k)"
                  value={link.followers}
                  onChange={(e) => onChange(link.id, 'followers', e.target.value)}
                  className="md:col-span-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => onRemove(link.id)}
                  className="md:col-span-1 flex justify-center items-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 px-4 py-2 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 w-full"
          >
            + Add Platform
          </button>
        </div>
      </div>
    </div>
  );
}