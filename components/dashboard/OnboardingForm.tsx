"use client";

import React, { useState } from 'react';
import { useCardData } from '@/contexts/CardDataProvider';

export default function OnboardingForm() {
  const { cardData, handleTaglineChange, handleAddSocialLink, handleRemoveSocialLink, handleSocialLinkChange } = useCardData();
  
  // State for managing the submission process
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // This function now contains the real logic to save data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Call our backend API endpoint
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData), // Send the current state of the card
      });

      // If the server responds with an error, handle it
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred.");
      }
      
      // Handle success
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds

    } catch (err: any) {
      // Set the error message to display it in the UI
      setError(err.message);
    } finally {
      // Re-enable the button whether it succeeded or failed
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Create Your ViraCard</h2>
      <p className="mt-2 text-gray-500 mb-6">
        As you fill out your details, your card will update in real-time.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tagline Input */}
        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
          <input
            type="text" id="tagline" name="tagline"
            value={cardData.tagline}
            onChange={handleTaglineChange}
            placeholder="e.g., NYC-based Beauty & Lifestyle Creator"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Social Platforms</h3>
          <div className="mt-4 space-y-4">
            {cardData.socialLinks.map((link) => (
              <div key={link.id} className="grid grid-cols-1 md:grid-cols-8 gap-3 p-4 border rounded-md bg-gray-50">
                <select name="platform" value={link.platform} onChange={(e) => handleSocialLinkChange(link.id, 'platform', e.target.value)} className="md:col-span-2 block w-full px-3 py-2 bg-white border rounded-md"><option value="instagram">Instagram</option><option value="tiktok">TikTok</option><option value="youtube">YouTube</option><option value="x">X (Twitter)</option></select>
                <input type="text" name="username" placeholder="Username" value={link.username} onChange={(e) => handleSocialLinkChange(link.id, 'username', e.target.value)} className="md:col-span-3 block w-full px-3 py-2 bg-white border rounded-md"/>
                <input type="text" name="followers" placeholder="Followers (e.g., 10k)" value={link.followers} onChange={(e) => handleSocialLinkChange(link.id, 'followers', e.target.value)} className="md:col-span-2 block w-full px-3 py-2 bg-white border rounded-md"/>
                <button type="button" onClick={() => handleRemoveSocialLink(link.id)} className="md:col-span-1 flex justify-center items-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">Remove</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddSocialLink} className="mt-4 px-4 py-2 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 w-full">+ Add Platform</button>
        </div>
        <hr />
        <div className="flex justify-end items-center gap-4">
          {/* Display Success or Error Messages */}
          {success && <p className="text-sm text-green-600">Profile Saved!</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}