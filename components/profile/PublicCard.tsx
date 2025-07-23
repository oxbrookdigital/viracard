// components/profile/PublicCard.tsx

"use client";

// We define a type for the props this component expects
type CardData = {
  name: string;
  tagline: string;
  socialLinks: {
    platform: string;
    followers: string;
  }[];
};

// A simple helper function to format large numbers
const formatFollowers = (followers: string): string => {
  const num = parseFloat(followers.replace(/,/g, ''));
  if (isNaN(num)) return followers;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

const SocialIcon = ({ platform }: { platform: string }) => {
  const ICONS: { [key: string]: string } = {
    instagram: '📷',
    tiktok: '🎵',
    youtube: '▶️',
    x: 'X',
  };
  return <span className="text-2xl">{ICONS[platform] || '❓'}</span>;
};

// The component receives cardData as a prop
export default function PublicCard({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 shadow-md flex-shrink-0"></div>
      <h2 className="text-2xl font-bold text-gray-800">{cardData.name}</h2>
      <p className="mt-1 text-gray-500 min-h-[20px]">{cardData.tagline}</p>
      
      <div className="mt-6 w-full flex justify-center items-center gap-4 flex-wrap">
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
    </div>
  );
}