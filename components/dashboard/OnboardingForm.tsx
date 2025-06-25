// components/dashboard/OnboardingForm.tsx

"use client";

import React from 'react';

// Define the shape of the data and the functions this component needs
type CardData = {
  name: string;
  tagline: string;
};

type OnboardingFormProps = {
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
};

export default function OnboardingForm({ cardData, setCardData }: OnboardingFormProps) {
  
  // This handler updates the state in the parent component.
  // It takes the field name and its new value.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardData(prevData => ({
      ...prevData, // Keep the old data
      [name]: value, // Update the specific field that changed
    }));
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold text-gray-800">Edit Your Card</h2>
      <p className="mt-2 text-gray-500 mb-6">
        Fill out your details below to see your card update in real-time.
      </p>

      <form className="space-y-6">
        {/* Name Input - Note: We'll make this editable later. For now, it's read-only. */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={cardData.name}
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
            readOnly // The name comes from the Google profile, so we don't let them edit it initially.
          />
        </div>

        {/* Tagline Input */}
        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={cardData.tagline}
            onChange={handleChange} // When this input changes, it calls our handler
            placeholder="e.g., NYC-based Beauty & Lifestyle Creator"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </form>
    </div>
  );
}