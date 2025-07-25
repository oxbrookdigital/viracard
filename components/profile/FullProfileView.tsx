// components/profile/FullProfileView.tsx

"use client";

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

// The component receives the full profile object as a prop
export default function FullProfileView({ profile }: { profile: any }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full">
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 shadow-md flex-shrink-0">
          {/* Future <Image> tag */}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{profile.full_name}</h1>
          <p className="mt-2 text-lg text-gray-600">{profile.tagline}</p>
        </div>
      </div>

      <hr className="my-8" />

      {/* --- Social Metrics Section --- */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Social Presence</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {profile.social_links?.map((link: any, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <SocialIcon platform={link.platform} />
              <div className="mt-2 text-2xl font-bold text-gray-800">
                {formatFollowers(link.followers)}
              </div>
              <div className="text-sm text-gray-500 capitalize">{link.platform}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Placeholder for Future Sections --- */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Brand Collaborations</h2>
        <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
          Brand logos will appear here.
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Testimonials</h2>
        <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
          Testimonials will appear here.
        </div>
      </div>
    </div>
  );
}