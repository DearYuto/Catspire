"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

interface GameLogoProps {
  initAnimation: boolean;
}

const GameLogo = ({ initAnimation }: GameLogoProps) => {
  const router = useRouter();

  const [showOptions, setShowOptions] = useState(false);

  return (
    <motion.div
      initial={
        initAnimation ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }
      }
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: initAnimation ? 1.5 : 0,
        delay: initAnimation ? 0.2 : 0,
      }}
      className="relative z-0 flex flex-col items-center justify-center min-h-screen gap-8"
    >
      <svg
        viewBox="0 0 400 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[90vw] max-w-4xl h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%">
            <stop
              offset="0%"
              style={{ stopColor: "#FFE5B8", stopOpacity: 0.4 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#9D8FFF", stopOpacity: 0 }}
            />
          </radialGradient>

          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FFF8E7" }} />
            <stop offset="50%" style={{ stopColor: "#FFE5B8" }} />
            <stop offset="100%" style={{ stopColor: "#FFD88A" }} />
          </linearGradient>

          <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FFF8E7" }} />
            <stop offset="30%" style={{ stopColor: "#FFE5B8" }} />
            <stop offset="70%" style={{ stopColor: "#E8D4A0" }} />
            <stop offset="100%" style={{ stopColor: "#D4B887" }} />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="200" cy="55" r="70" fill="url(#moonGlow)" opacity="0.5" />

        <MoonGlow />
        <TowerSilhouette />
        <CatSilhouette />

        <MainTitle />
        <TitleDecoration />
        <SubTitle />

        {/* Stars */}
        <g fill="#FFE5B8" opacity="0.9">
          <g transform="translate(140, 45)">
            <path
              d="M 0 -3 L 0.5 -0.5 L 3 0 L 0.5 0.5 L 0 3 L -0.5 0.5 L -3 0 L -0.5 -0.5 Z"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          <g transform="translate(260, 50)">
            <path
              d="M 0 -2.5 L 0.4 -0.4 L 2.5 0 L 0.4 0.4 L 0 2.5 L -0.4 0.4 L -2.5 0 L -0.4 -0.4 Z"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </motion.div>
  );
};

const MoonShard = () => {
  return (
    <path
      d="M 215 55 L 222 62 L 219 69 L 212 67 Z"
      fill="#FFF8E7"
      opacity="0.9"
    >
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 0; 0 -3; 0 0"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
  );
};

const TowerSilhouette = () => {
  return (
    <g opacity="0.7">
      <linearGradient id="towerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#6B5FCC" }} />
        <stop offset="100%" style={{ stopColor: "#2A1F4F" }} />
      </linearGradient>

      <path d="M 195 90 L 205 90 L 208 70 L 197 70 Z" fill="url(#towerGrad)" />
      <rect x="193" y="70" width="14" height="3" fill="#8B7FDD" opacity="0.6" />
      <path d="M 197 70 L 203 70 L 204 55 L 196 55 Z" fill="url(#towerGrad)" />
      <rect x="195" y="55" width="10" height="2" fill="#8B7FDD" opacity="0.6" />
      <path d="M 198 55 L 202 55 L 200 45 Z" fill="#9D8FFF" />
    </g>
  );
};

const CatSilhouette = () => {
  return (
    <g transform="translate(200, 85)" filter="url(#glow)">
      <ellipse cx="0" cy="0" rx="6" ry="4" fill="#1A0F3F" />
      <circle cx="0" cy="-4" r="3.5" fill="#1A0F3F" />
      <path d="M -2.5 -6.5 L -2 -9 L -0.5 -6.5 Z" fill="#1A0F3F" />
      <path d="M 0.5 -6.5 L 2 -9 L 2.5 -6.5 Z" fill="#1A0F3F" />
      <path
        d="M 6 0 Q 10 -2 12 2"
        stroke="#1A0F3F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};

const MoonGlow = () => {
  return (
    <g filter="url(#strongGlow)">
      <path
        d="M 200 40 A 22 22 0 1 1 200 80 A 18 18 0 1 0 200 40 Z"
        fill="url(#moonGrad)"
        opacity="0.05"
      />
      <MoonShard />
    </g>
  );
};

const MainTitle = () => {
  return (
    <>
      <text
        x="200"
        y="142"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="50"
        fontWeight="900"
        textAnchor="middle"
        fill="#FFE5B8"
        letterSpacing="4"
        opacity="0.3"
        filter="url(#strongGlow)"
      >
        CATSPIRE
      </text>
      <text
        x="200"
        y="142"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="50"
        fontWeight="900"
        textAnchor="middle"
        fill="url(#titleGrad)"
        letterSpacing="4"
      >
        CATSPIRE
      </text>
    </>
  );
};

const TitleDecoration = () => {
  return (
    <>
      <g fill="#D4B887" opacity="0.8">
        <path d="M 200 148 L 202 150 L 200 152 L 198 150 Z" />
        <path d="M 130 138 L 131 139 L 130 140 L 129 139 Z" />
        <path d="M 270 138 L 271 139 L 270 140 L 269 139 Z" />
      </g>

      <g stroke="#D4B887" strokeWidth="1.5" fill="none" opacity="0.5">
        <line x1="120" y1="155" x2="180" y2="155" strokeLinecap="round" />
        <line x1="220" y1="155" x2="280" y2="155" strokeLinecap="round" />
      </g>
    </>
  );
};

const SubTitle = () => {
  return (
    <text
      x="200"
      y="172"
      fontFamily="Cinzel, Georgia, serif"
      fontSize="11"
      textAnchor="middle"
      fill="#B8A7D8"
      letterSpacing="5"
      fontWeight="400"
    >
      MOON SHARD CHRONICLES
    </text>
  );
};

export default GameLogo;
