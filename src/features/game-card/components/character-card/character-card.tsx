"use client";

import { motion } from "framer-motion";
import { CharacterClass } from "@/shared/types";
import {
  CHARACTER_INFO,
  getCharacterImages,
  CharacterCardHeader,
  CharacterCardContent,
} from "@/entities/character";
import { use3dCardEffect } from "@/shared/lib/hooks/use-3d-card-effect";
import { useHolographicEffect } from "@/shared/lib/hooks/use-holographic-effect";
import {
  Card3DWrapper,
  CardHolographicOverlay,
  CardDecoration,
} from "@/shared/components/card";
import { RefObject } from "react";

export interface CharacterCardProps {
  characterClass: CharacterClass;
  onClick: () => void;
  delay?: number;
}

export function CharacterCard({
  characterClass,
  onClick,
  delay = 0,
}: CharacterCardProps) {
  const info = CHARACTER_INFO[characterClass];
  const images = getCharacterImages(characterClass);

  const { cardRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } =
    use3dCardEffect();

  const { holoX, holoY, updatePosition, reset } = useHolographicEffect();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e);

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updatePosition(x, y, rect);
    }
  };

  const onMouseLeave = () => {
    handleMouseLeave();
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="cursor-pointer"
      onClick={onClick}
      style={{ perspective: "1000px" }}
      suppressHydrationWarning
    >
      <Card3DWrapper
        cardRef={cardRef! as RefObject<HTMLDivElement>}
        rotateX={rotateX}
        rotateY={rotateY}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div
          className="bg-opacity-60 relative flex flex-col overflow-visible rounded-2xl border border-slate-700 bg-slate-950 shadow-lg backdrop-blur-sm transition-all hover:border-slate-500 hover:shadow-2xl hover:shadow-white/10"
          style={{ height: "850px" }}
          suppressHydrationWarning
        >
          <CardDecoration />

          <CardHolographicOverlay holoX={holoX} holoY={holoY} />

          <CharacterCardHeader
            background={images.background}
            characterImage={images.character}
            characterName={info.title}
          />

          <CharacterCardContent
            description={info.description}
            passive={info.passive}
            lore={info.lore}
            features={info.pros}
            difficulty={info.difficulty}
            animationDelay={delay}
          />
        </div>
      </Card3DWrapper>
    </motion.div>
  );
}
