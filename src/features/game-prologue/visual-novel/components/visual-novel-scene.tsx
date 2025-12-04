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
      className="relative h-full w-full cursor-pointer overflow-hidden bg-slate-950"
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        {scene.background && (
          <motion.div
            key={scene.background}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 overflow-hidden"
          >
            <Image
              src={scene.background}
              alt="Background"
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950 opacity-60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 배경 장식 - 이미지가 없을 때도 분위기 유지 */}
      {!scene.background && (
        <div className="pointer-events-none absolute inset-0">
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
            className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(100, 100, 150, 0.15)" }}
          />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-20 pb-12 sm:px-8 sm:pt-24 sm:pb-14 lg:px-12 lg:pt-28 lg:pb-16">
        {/* 대화창 영역 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 w-full max-w-4xl shrink-0"
        >
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="pointer-events-none flex min-h-0 w-full max-w-6xl flex-1 items-end justify-center">
              <AnimatePresence mode="wait">
                {scene.character && (
                  <motion.div
                    key={scene.character.sprite}
                    initial={{
                      opacity: 0,
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
                        : "justify-end",
                    )}
                  >
                    <div className="relative h-[260px] w-[180px] overflow-hidden sm:h-[320px] sm:w-[220px] lg:h-[370px] lg:w-[250px]">
                      <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <div className="relative h-[160px] w-[220px] sm:h-[200px] sm:w-[280px] lg:h-[220px] lg:w-[320px]">
                          <Image
                            src={scene.character.sprite}
                            alt={scene.character.name}
                            fill
                            priority
                            className="mt-2 object-contain"
                          />
                        </div>
                      </div>

                      <Image
                        src="/images/decoration/decoration_frame.default.png"
                        alt="Character frame"
                        fill
                        priority
                        className="pointer-events-none z-10 object-contain"
                      />

                      {/* 이름표 */}
                      <div className="absolute bottom-0 left-1/2 z-30 w-full -translate-x-1/2">
                        {scene.speaker && (
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <span className="inline-block w-full rounded-xl border-2 border-[#965f2f] bg-linear-to-b from-[#965f2f] to-[#c78c47] px-5 py-2.5 text-center text-base font-bold text-white md:text-lg">
                              {scene.speaker}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 대화 박스 */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={clsx(
                "bg-slate-[#965f2f] bg-opacity-95 border-opacity-60 w-full self-end rounded-xl border-2 border-[#cba9823e] px-4 py-4 shadow-2xl backdrop-blur-md sm:px-6 sm:py-6 md:px-8 md:pt-10 md:pb-8",
                "max-h-[320px] min-h-[180px] sm:min-h-[210px] md:min-h-[240px] lg:min-h-[260px]",
              )}
            >
              <p className="min-h-16 text-left text-sm leading-relaxed text-white sm:text-base md:text-lg lg:text-xl">
                {displayedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="ml-2 inline-block text-gray-400"
                  >
                    ▼
                  </motion.span>
                )}
              </p>
            </motion.div>
          </div>

          {/* 진행 표시 */}
          <div className="mt-3 flex h-10 items-center justify-center">
            {!isTyping && canProceed && (
              <motion.div
                className="pb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 4, 0] }}
                transition={{
                  opacity: { duration: 0.3 },
                  y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <span className="text-xs font-medium text-white opacity-60 md:text-sm">
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
