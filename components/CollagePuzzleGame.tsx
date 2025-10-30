"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLeaf } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";

interface PuzzlePiece {
  id: number;
  imageSrc: string;
  correctPosition: number;
  currentPosition: number;
  rotation: number;
}

const CollagePuzzleGame = () => {
  const { t } = useLanguage();
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  // Initialize puzzle pieces
  useEffect(() => {
    const puzzleImages = [
      "/images/games/Couple.jpeg",
      "/images/games/Couple3.jpeg",
      "/images/games/Kuscheltiere.jpeg",
      "/images/games/bebii.jpeg",
      "/images/games/Bebi_cute.jpeg",
      "/images/games/Katzii.jpeg",
      "/images/games/Schweini.jpeg",
    ];

    const shuffledPieces: PuzzlePiece[] = puzzleImages.map((img, index) => ({
      id: index,
      imageSrc: img,
      correctPosition: index,
      currentPosition: index,
      rotation: Math.random() * 20 - 10, // Random rotation between -10 and 10 degrees
    }));

    // Shuffle the current positions
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempPosition = shuffledPieces[i].currentPosition;
      shuffledPieces[i].currentPosition = shuffledPieces[j].currentPosition;
      shuffledPieces[j].currentPosition = tempPosition;
    }

    setPieces(shuffledPieces);
  }, []);

  // Check if puzzle is complete
  useEffect(() => {
    if (pieces.length > 0) {
      const complete = pieces.every((piece) => piece.currentPosition === piece.correctPosition);
      setIsComplete(complete);
    }
  }, [pieces]);

  const handlePieceClick = (pieceId: number) => {
    if (showAnswer) return; // Don't allow moves when showing answer

    if (selectedPiece === null) {
      setSelectedPiece(pieceId);
    } else {
      // Swap positions
      setPieces((prevPieces) => {
        const newPieces = [...prevPieces];
        const piece1Index = newPieces.findIndex((p) => p.id === selectedPiece);
        const piece2Index = newPieces.findIndex((p) => p.id === pieceId);

        const tempPosition = newPieces[piece1Index].currentPosition;
        newPieces[piece1Index].currentPosition = newPieces[piece2Index].currentPosition;
        newPieces[piece2Index].currentPosition = tempPosition;

        return newPieces;
      });
      setSelectedPiece(null);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setIsComplete(true);
  };

  const handleReplay = () => {
    setShowAnswer(false);
    setIsComplete(false);
    setSelectedPiece(null);

    // Re-shuffle the puzzle
    setPieces((prevPieces) => {
      const shuffled = [...prevPieces];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math. random() * (i + 1));
        const tempPosition = shuffled[i].currentPosition;
        shuffled[i].currentPosition = shuffled[j].currentPosition;
        shuffled[j].currentPosition = tempPosition;
      }
      return shuffled;
    });
  };

  // Sort pieces by current position for rendering
  const sortedPieces = [...pieces].sort((a, b) => a.currentPosition - b.currentPosition);

  if (isComplete || showAnswer) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Success Message */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <FaLeaf className="size-8 text-green-400 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
              {showAnswer ? "Here's Your Surprise!" : "Perfect! You Did It!"}
            </h2>
            <FaLeaf className="size-8 text-green-400 animate-bounce" />
          </div>
        </div>

        {/* Final Reveal */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border-4 border-green-500/30 shadow-2xl">
            <Image
              src="/images/games/Couple2.jpeg"
              alt="Final Reveal"
              width={800}
              height={600}
              className="w-full h-auto"
            />

            {/* Overlay with Date and Logo */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end items-center pb-8 gap-4">
              {/* Date */}
              <div className="backdrop-blur-md bg-white/10 rounded-xl px-8 py-4 border border-white/20">
                <p className="text-2xl md:text-4xl font-serif text-white font-bold text-center">
                  30th November 2025
                </p>
                <p className="text-lg md:text-xl text-green-300 text-center mt-2">
                  Our Visit to the Sanctuary
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
                  className="w-auto h-16 md:h-20"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Replay Button */}
        <div className="text-center">
          <button
            onClick={handleReplay}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50"
          >
            Play Again
          </button>
        </div>

        {/* Botanical decoration */}
        <div className="flex justify-center gap-4 text-green-400/50">
          <FaLeaf className="size-6 animate-pulse" />
          <FaLeaf className="size-8" />
          <FaLeaf className="size-6 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Instructions */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
          Arrange the Memories
        </h2>
        <p className="text-white/80 text-lg">
          Click two pieces to swap them and create the perfect collage!
        </p>
        <div className="flex justify-center gap-4">
          <FaLeaf className="size-6 text-green-400 animate-pulse" />
          <FaLeaf className="size-4 text-green-300" />
          <FaLeaf className="size-5 text-green-400 animate-pulse" />
        </div>
      </div>

      {/* Puzzle Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {sortedPieces.map((piece) => (
          <button
            key={piece.id}
            onClick={() => handlePieceClick(piece.id)}
            className={`relative aspect-square rounded-lg overflow-hidden border-4 transition-all duration-300 transform hover:scale-105 ${
              selectedPiece === piece.id
                ? "border-yellow-400 shadow-lg shadow-yellow-500/50 scale-105"
                : "border-purple-500/30 hover:border-purple-400/60"
            }`}
            style={{
              transform: `rotate(${piece.rotation}deg) ${selectedPiece === piece.id ? "scale(1.05)" : ""}`,
            }}
          >
            <Image
              src={piece.imageSrc}
              alt={`Puzzle piece ${piece.id + 1}`}
              fill
              className="object-cover"
            />
            {selectedPiece === piece.id && (
              <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                <div className="text-white text-2xl font-bold">✓</div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Show Answer Button */}
      <div className="text-center">
        <button
          onClick={handleShowAnswer}
          className="px-6 py-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 border border-purple-400/30"
        >
          Show Me the Surprise
        </button>
      </div>
    </div>
  );
};

export default CollagePuzzleGame;
