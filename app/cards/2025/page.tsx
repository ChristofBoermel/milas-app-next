"use client";

import InfoBox from "@/components/InfoBox";
import CollagePuzzleGame from "@/components/CollagePuzzleGame";
import { useLanguage } from "@/contexts/LanguageContext";

const Card2025Page = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden">
      {/* Starry background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/stars.jpeg')",
        }}
      />

      {/* Gradient overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl space-y-16 md:space-y-24 animate-fade-in py-12">

        {/* 22nd Birthday Card */}
        <div className="flex justify-center animate-slide-up">
          <InfoBox heading={t("cards.title22")} gradientColor="from-pink-500/20 to-purple-500/20">
            {t("cards.card22")}
          </InfoBox>
        </div>

        {/* Collage Puzzle Game */}
        <div className="flex justify-center animate-slide-up-delay">
          <CollagePuzzleGame />
        </div>

      </div>

      {/* Floating sparkle effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-twinkle-delay" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-twinkle-delay-2" />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-300 rounded-full animate-twinkle" />
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-twinkle-delay" />
      </div>
    </div>
  );
};

export default Card2025Page;
