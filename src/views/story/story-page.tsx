"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, MoonParticles } from "@/shared/components";
import { MuteButton } from "@/shared/components/audio-control";
import { VisualNovelScene } from "@/features/game-prologue/visual-novel";
import { prologueDialogue } from "@/shared/config/prologue-dialogue";
import { SkipConfirmModal } from "@/features/game-prologue/scene-skip/components/skip-confirm-modal";

export function StoryPage() {
  const router = useRouter();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const currentScene = prologueDialogue[currentSceneIndex];
  const isLastScene = currentSceneIndex === prologueDialogue.length - 1;

  const handleNext = () => {
    if (isLastScene) {
      router.push("/character-select");
    } else {
      setCurrentSceneIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    router.push("/character-select");
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-6 lg:px-10"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />

      <div
        className="relative z-10 w-full max-w-[1920px] overflow-hidden bg-transparent"
        style={{
          aspectRatio: "16/9",
          maxHeight: "1080px",
          height: "clamp(420px, calc(100vh - 5rem), 1080px)",
        }}
      >
        {/* Top Controls - 게임 영역 내부 */}
        <div className="absolute top-0 right-0 left-0 z-50 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-full bg-black/20 px-3 py-2 whitespace-nowrap sm:gap-4 sm:bg-transparent sm:px-0 sm:py-0">
            {/* Left side - Navigation buttons */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => router.push("/")}
                className="btn-ghost shrink-0"
              >
                <span className="flex items-center gap-2 font-medium">
                  메인으로
                </span>
              </Button>
            </div>

            {/* Right side - Progress & Mute button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-end gap-1 rounded-xl bg-white/10 px-3 py-2 sm:gap-2 sm:px-4"
            >
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                exit={{ opacity: 0 }}
              >
                <span className="mr-2 text-xs text-white opacity-60">
                  Scene
                </span>
                <span className="text-sm font-bold text-white opacity-60">
                  {currentSceneIndex + 1}
                </span>
                <span className="pl-1 text-sm text-white opacity-60">
                  / {prologueDialogue.length}
                </span>
              </motion.div>
            </motion.div>

            <Button
              size="sm"
              onClick={() => setShowSkipConfirm(true)}
              className="btn-ghost shrink-0"
            >
              <span className="flex items-center gap-2 font-medium">
                건너뛰기
              </span>
            </Button>
          </div>

          <MuteButton showAnimation={false} />
        </div>

        {/* 비주얼노벨씬 */}
        <VisualNovelScene
          scene={currentScene}
          onNext={handleNext}
          canProceed={true}
        />

        {/* 스킵 모달 */}
        {showSkipConfirm && (
          <SkipConfirmModal
            handleShowSkipConfirmModal={setShowSkipConfirm}
            handleSkip={handleSkip}
          />
        )}
      </div>
    </main>
  );
}
