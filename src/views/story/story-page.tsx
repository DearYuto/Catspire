"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/shared/components";
import { MuteButton } from "@/shared/components/audio-control";
import { VisualNovelScene } from "@/features/game-prologue/visual-novel";
import { prologueDialogue } from "@/shared/config/prologue-dialogue";
import { SkipConfirmModal } from "@/features/game-prologue/scene-skip/components/skip-confirm-modal";
import { GameLayout } from "@/shared/layouts/game-layout";

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
    <GameLayout>
      {/* Top Controls - 게임 영역 내부 */}
      <div className="absolute top-0 right-0 left-0 z-50 p-4 sm:p-6 lg:p-8">
        <div className="flex w-full items-center justify-between gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/")}
            className="btn-ghost shrink-0"
          >
            <span className="flex items-center gap-2 font-medium">
              메인으로
            </span>
          </Button>

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
              <span className="mr-2 text-xs text-white opacity-60">Scene</span>
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
            className="btn-ghost order-last shrink-0"
          >
            <span className="flex items-center gap-2 font-medium">
              건너뛰기
            </span>
          </Button>
        </div>
      </div>

      <MuteButton showAnimation={false} />

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
    </GameLayout>
  );
}
