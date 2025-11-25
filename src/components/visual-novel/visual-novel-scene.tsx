"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DialogueScene } from "@/shared/config/prologue-dialogue";
import Image from "next/image";
import clsx from "clsx";

interface VisualNovelSceneProps {
  scene: DialogueScene;
  onNext: () => void;
  canProceed: boolean;
}

export function VisualNovelScene({
  scene,
  onNext,
  canProceed,
}: VisualNovelSceneProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const textSpeed = scene.textSpeed || 30;

  // 텍스트 타이핑 애니메이션
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < scene.text.length) {
        setDisplayedText(scene.text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, textSpeed);

    return () => clearInterval(interval);
  }, [scene.text, textSpeed]);

  const handleClick = () => {
    if (isTyping) {
      // 타이핑 중이면 즉시 전체 텍스트 표시
      setDisplayedText(scene.text);
      setIsTyping(false);
    } else if (canProceed) {
      // 타이핑 완료 후 다음 장면으로
      onNext();
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer bg-slate-950"
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        {scene.background && (
          <motion.div
            key={scene.background}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 overflow-hidden"
          >
            <Image
              src={scene.background}
              alt="Background"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950 opacity-60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 배경 장식 - 이미지가 없을 때도 분위기 유지 */}
      {!scene.background && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(100, 100, 150, 0.15)" }}
          />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-12 md:px-20 pt-28 pb-16">
        <div className="flex-1 w-full max-w-6xl flex items-end justify-center min-h-0 pt-6 pb-4 pointer-events-none">
          <AnimatePresence mode="wait">
            {scene.character && (
              <motion.div
                style={{
                  padding: "0px 54px",
                }}
                key={scene.character.sprite}
                initial={{
                  opacity: 0,
                  x: scene.character.position === "left" ? -100 : 100,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: scene.character.position === "left" ? -50 : 50,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={clsx(
                  "relative flex w-full",
                  scene.character.position === "left"
                    ? "justify-start"
                    : "justify-end"
                )}
              >
                <Image
                  src={scene.character.sprite}
                  alt={scene.character.name}
                  width={400}
                  height={700}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 대화창 영역 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl shrink-0"
        >
          {/* 이름표 */}
          <div className="min-h-10 mb-3">
            {scene.speaker && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block px-5 py-2.5 bg-linear-to-r from-slate-700 to-slate-800 rounded-t-xl border border-slate-600 border-opacity-50"
              >
                <span className="text-white font-bold text-base md:text-lg">
                  {scene.speaker}
                </span>
              </motion.div>
            )}
          </div>

          {/* 대화 박스 */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ padding: "16px 24px" }}
            className="bg-slate-900 bg-opacity-95 backdrop-blur-md rounded-xl px-6 md:px-8 pt-8 md:pt-10 pb-6 md:pb-8 border border-slate-700 border-opacity-60 shadow-2xl"
          >
            <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed min-h-16 text-left">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block ml-2 text-gray-400"
                >
                  ▼
                </motion.span>
              )}
            </p>
          </motion.div>

          {/* 진행 표시 */}
          <div className="h-10 flex items-center justify-center mt-3">
            {!isTyping && canProceed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 6, 0] }}
                transition={{
                  opacity: { duration: 0.3 },
                  y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <span className="text-gray-400 text-xs md:text-sm font-medium">
                  클릭하여 계속 ▼
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
