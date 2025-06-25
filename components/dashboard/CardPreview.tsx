// components/dashboard/CardPreview.tsx

"use client";

// Define the shape of the data this component expects to receive
type CardData = {
  name: string;
  tagline: string;
};

type CardPreviewProps = {
  cardData: CardData;
};

export default function CardPreview({ cardData }: CardPreviewProps) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      {/* Profile Image Placeholder */}
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 shadow-md">
        {/* In the future, this will be an <Image> tag */}
      </div>

      {/* Name: Displays the name from the cardData prop */}
      <h2 className="text-2xl font-bold text-gray-800">
        {cardData.name || "Your Name"}
      </h2>

      {/* Tagline: Displays the tagline from the cardData prop */}
      <p className="mt-1 text-gray-500">
        {cardData.tagline || "Your catchy tagline here!"}
      </p>

      {/* Social Icons Placeholder */}
      <div className="mt-6 flex gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}