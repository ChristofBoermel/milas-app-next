"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage = () => {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full space-y-8 md:space-y-12 animate-fade-in">
        
        {/* Astronaut Image */}
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl animate-float">
          <div className="relative shadow-2xl rounded-2xl overflow-hidden border-4 border-purple-500/30">
            <Image
              src={"/images/astronauts.png"}
              alt="Astronauts illustration"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center px-4 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            {t("homepage.title")}
          </h1>
        </div>

        {/* Text Content */}
        <div className="text-center px-4 max-w-2xl animate-slide-up-delay">
          <div className="backdrop-blur-sm bg-slate-800/30 rounded-2xl p-6 md:p-8 border border-purple-500/20 shadow-xl">
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              {t("homepage.message")}
            </p>
          </div>
        </div>
      </div>

      {/* Floating sparkle effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-twinkle-delay" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-twinkle-delay-2" />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle" />
      </div>
    </div>
  );
};

export default HomePage;
