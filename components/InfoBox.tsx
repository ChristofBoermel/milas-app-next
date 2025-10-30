import Image, { StaticImageData } from "next/image";
import mila from "@/public/images/Mila.jpg";
import { MdCake } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaGift } from "react-icons/fa6";
import { ReactNode } from "react";

interface InfoBoxProps {
  heading: string;
  children: ReactNode;
  backgroundImage?: StaticImageData | string;
  gradientColor?: string;
}

const InfoBox = ({
  heading,
  children,
  backgroundImage,
  gradientColor = "from-purple-500/20 to-pink-500/20",
}: InfoBoxProps) => {
  // Use backgroundImage prop if provided, otherwise fallback to default mila image
  const imageSrc = backgroundImage || mila;

  return (
    <div className="w-full max-w-2xl backdrop-blur-sm bg-slate-800/40 rounded-2xl p-6 md:p-8 border border-purple-500/30 shadow-2xl">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative animate-float">
          <div className="rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg">
            <Image
              className="size-32 md:size-40"
              src={imageSrc}
              alt="Mila and Mika"
              width={160}
              height={160}
            />
          </div>
          {/* Decorative gradient ring */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradientColor} opacity-30 animate-pulse`} />
          {/* Decorative floating icons */}
          <div className="absolute -top-2 -right-2 text-purple-400 animate-bounce">
            <MdCake className="size-8" />
          </div>
          <div className="absolute -top-2 -left-2 text-pink-400 animate-pulse">
            <FaHeart className="size-6" />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center gap-3">
          <FaGift className="size-8 md:size-10 text-pink-500" />
          {heading}
          <FaGift className="size-8 md:size-10 text-purple-500" />
        </h1>

        <div className={`w-12 h-1 bg-gradient-to-r ${gradientColor} rounded-full`} />

        <p className="text-base md:text-lg text-white/90 leading-relaxed text-center px-2">
          {children}
        </p>
      </div>
    </div>
  );
};

export default InfoBox;
