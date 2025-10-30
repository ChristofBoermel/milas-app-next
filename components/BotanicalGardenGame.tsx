"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLeaf, FaHeart, FaArrowRight } from "react-icons/fa6";
import { GiFlowerPot } from "react-icons/gi";

interface Station {
  id: number;
  imageSrc: string;
  prompt: string;
  imageAlt: string;
}

const BotanicalGardenGame = () => {
  const [currentStation, setCurrentStation] = useState(0);
  const [showFinalReveal, setShowFinalReveal] = useState(false);

  // Stations in the order specified
  const stations: Station[] = [
    {
      id: 1,
      imageSrc: "/images/games/bebii.jpeg",
      prompt: "[Prompt for bebii - to be added]",
      imageAlt: "Memory 1"
    },
    {
      id: 2,
      imageSrc: "/images/games/Couple.jpeg",
      prompt: "[Prompt for Couple - to be added]",
      imageAlt: "Memory 2"
    },
    {
      id: 3,
      imageSrc: "/images/games/Bebi_cute.jpeg",
      prompt: "[Prompt for Bebi_cute - to be added]",
      imageAlt: "Memory 3"
    },
    {
      id: 4,
      imageSrc: "/images/games/Couple3.jpeg",
      prompt: "[Prompt for Couple3 - to be added]",
      imageAlt: "Memory 4"
    },
    {
      id: 5,
      imageSrc: "/images/games/Kuscheltiere.jpeg",
      prompt: "[Prompt for Kuscheltiere - to be added]",
      imageAlt: "Memory 5"
    },
    {
      id: 6,
      imageSrc: "/images/games/Katzii.jpeg",
      prompt: "[Prompt for Katzii - to be added]",
      imageAlt: "Memory 6"
    },
    {
      id: 7,
      imageSrc: "/images/games/Schweini.jpeg",
      prompt: "[Prompt for Schweini - to be added]",
      imageAlt: "Memory 7"
    },
  ];

  const totalStations = stations.length;
  const isLastStation = currentStation === totalStations - 1;

  const handleNext = () => {
    if (isLastStation) {
      setShowFinalReveal(true);
    } else {
      setCurrentStation((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStation > 0) {
      setCurrentStation((prev) => prev - 1);
    }
  };

  const handleShowAnswer = () => {
    setShowFinalReveal(true);
  };

  const handleRestart = () => {
    setCurrentStation(0);
    setShowFinalReveal(false);
  };

  // Final Reveal
  if (showFinalReveal) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* Success Message */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <FaLeaf className="size-8 text-green-400 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
              Your Special Surprise!
            </h2>
            <FaLeaf className="size-8 text-green-400 animate-bounce" />
          </div>
          <p className="text-white/80 text-lg">
            You&apos;ve walked through all our beautiful memories 💚
          </p>
        </div>

        {/* Final Reveal Image */}
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border-4 border-green-500/30 shadow-2xl">
            <Image
              src="/images/games/Couple2.jpeg"
              alt="Final Reveal"
              width={1000}
              height={750}
              className="w-full h-auto"
            />

            {/* Overlay with Date and Logo */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex flex-col justify-end items-center pb-8 gap-4">
              {/* Date */}
              <div className="backdrop-blur-md bg-white/10 rounded-xl px-8 py-4 border border-white/20 shadow-lg">
                <p className="text-2xl md:text-4xl font-serif text-white font-bold text-center">
                  30th November 2025
                </p>
                <p className="text-lg md:text-xl text-green-300 text-center mt-2 flex items-center justify-center gap-2">
                  <FaHeart className="size-5" />
                  Our Visit to the Sanctuary
                  <FaHeart className="size-5" />
                </p>
              </div>

              {/* Sanctuary Logo Link */}
              <a
                href="https://www.lebenshof-lipaio.de"
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30 hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-green-500/50"
              >
                <Image
                  src="/images/games/Lipaio.jpeg"
                  alt="Lebenshof Lipaio"
                  width={200}
                  height={100}
                  className="w-auto h-16 md:h-20 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50"
          >
            Walk the Path Again
          </button>
        </div>

        {/* Botanical decoration */}
        <div className="flex justify-center gap-4 text-green-400/50">
          <FaLeaf className="size-6 animate-pulse" />
          <GiFlowerPot className="size-8" />
          <FaLeaf className="size-6 animate-pulse" />
        </div>
      </div>
    );
  }

  // Garden Path - Station View
  const currentStationData = stations[currentStation];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
          Walk Down Memory Lane
        </h2>
        <p className="text-white/80 text-lg">
          A botanical garden path through our special moments 🌿
        </p>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {stations.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index === currentStation
                  ? "w-12 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  : index < currentStation
                  ? "w-3 h-3 bg-green-500 rounded-full"
                  : "w-3 h-3 bg-purple-500/30 rounded-full"
              }`}
            />
          ))}
        </div>
        <p className="text-purple-300 text-sm">
          Station {currentStation + 1} of {totalStations}
        </p>
      </div>

      {/* Current Station */}
      <div className="relative animate-slide-up">
        {/* Botanical Frame */}
        <div className="absolute -top-4 -left-4 text-green-400/30">
          <FaLeaf className="size-16 rotate-45" />
        </div>
        <div className="absolute -top-4 -right-4 text-green-400/30">
          <FaLeaf className="size-16 -rotate-45" />
        </div>
        <div className="absolute -bottom-4 -left-4 text-green-400/30">
          <FaLeaf className="size-16 -rotate-45" />
        </div>
        <div className="absolute -bottom-4 -right-4 text-green-400/30">
          <FaLeaf className="size-16 rotate-45" />
        </div>

        {/* Station Card */}
        <div className="backdrop-blur-sm bg-slate-800/40 rounded-2xl p-6 md:p-8 border border-green-500/30 shadow-2xl space-y-6">
          {/* Image */}
          <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden border-4 border-green-500/20 shadow-lg">
            <Image
              src={currentStationData.imageSrc}
              alt={currentStationData.imageAlt}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Prompt */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <GiFlowerPot className="size-6" />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full" />
              <GiFlowerPot className="size-6" />
            </div>
            <p className="text-xl md:text-2xl text-white/90 font-serif italic leading-relaxed">
              {currentStationData.prompt}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentStation === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
            currentStation === 0
              ? "bg-purple-500/20 text-purple-300/50 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg shadow-purple-500/50"
          }`}
        >
          <FaArrowRight className="size-5 rotate-180" />
          Previous
        </button>

        <button
          onClick={handleShowAnswer}
          className="px-6 py-3 bg-gradient-to-r from-purple-600/60 to-pink-600/60 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 border border-purple-400/30"
        >
          Skip to Surprise
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 flex items-center gap-2"
        >
          {isLastStation ? "See Surprise" : "Next"}
          <FaArrowRight className="size-5" />
        </button>
      </div>

      {/* Botanical Footer */}
      <div className="flex justify-center gap-4 items-center text-green-400/40">
        <FaLeaf className="size-5 animate-pulse" />
        <div className="text-purple-300/50 text-sm">Follow the path through our garden of memories</div>
        <FaLeaf className="size-5 animate-pulse" />
      </div>
    </div>
  );
};

export default BotanicalGardenGame;
