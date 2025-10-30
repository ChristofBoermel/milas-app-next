"use client";

import { FaGift } from "react-icons/fa6";
import { MdCake } from "react-icons/md";

const Card2026Page = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Starry background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/stars.jpeg')",
        }}
      />

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl animate-fade-in space-y-8">
        <div className="relative">
          <MdCake className="size-32 text-purple-400 animate-float" />
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent text-center drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          Coming Soon
        </h1>

        <div className="backdrop-blur-sm bg-slate-800/30 rounded-2xl p-8 border border-purple-500/20 shadow-xl">
          <p className="text-xl md:text-2xl text-white/90 text-center leading-relaxed font-serif italic">
            This year&apos;s birthday celebration is still being prepared with love... ✨
          </p>
          <p className="text-lg text-purple-300/70 text-center mt-4">
            2026 - 23rd Birthday
          </p>
        </div>

        <div className="flex gap-4 items-center text-pink-400">
          <FaGift className="size-6 animate-bounce" />
          <FaGift className="size-8 animate-pulse" />
          <FaGift className="size-6 animate-bounce" />
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

export default Card2026Page;
