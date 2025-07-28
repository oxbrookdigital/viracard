"use client";

import Link from "next/link";

// Update the type definition to include 'isOwner'
type CardData = {
  name: string;
  tagline: string;
  username: string;
  socialLinks: {
    platform: string;
    followers: string;
  }[];
};

type PublicCardProps = {
  cardData: CardData;
  isOwner: boolean; // <-- Add the new prop here
};

const formatFollowers = (followers: string): string => {
  const num = parseFloat(followers.replace(/,/g, ''));
  if (isNaN(num)) return followers;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

const SocialIcon = ({ platform }: { platform: string }) => {
  const ICONS: { [key: string]: string } = { instagram: '📷', tiktok: '🎵', youtube: '▶️', x: 'X' };
  return <span className="text-2xl">{ICONS[platform] || '❓'}</span>;
};

// Update the component to accept 'isOwner'
export default function PublicCard({ cardData, isOwner }: PublicCardProps) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 shadow-md flex-shrink-0"></div>
      <h2 className="text-2xl font-bold text-gray-800">{cardData.name}</h2>
      <p className="mt-1 text-gray-500 min-h-[20px]">{cardData.tagline}</p>
      
      <div className="my-6 w-full border-t border-b border-gray-200 py-2">
        <span className="text-sm font-medium text-gray-400">Badges will appear here</span>
      </div>

      <div className="w-full flex justify-center items-center gap-4 flex-wrap">
        {cardData.socialLinks.map((link, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <SocialIcon platform={link.platform} />
            <span className="mt-1 text-sm font-semibold text-gray-700">
              {formatFollowers(link.followers)}
            </span>
            <span className="text-xs text-gray-400 capitalize">{link.platform}</span>
          </div>
        ))}
      </div>

      <div className="w-full mt-8 flex flex-col sm:flex-row gap-3">
        <Link href={`/${cardData.username}/full`} className="w-full">
          <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
            View Full Profile
          </button>
        </Link>
        <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Collaborate
        </button>
      </div>

      {/* Conditionally render the "Back to Dashboard" button */}
      {isOwner && (
        <div className="w-full mt-4">
          <Link href="/dashboard" className="w-full block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            Back to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}