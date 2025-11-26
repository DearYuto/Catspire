"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MoonParticles } from "@/shared/ui";
import { MuteButton } from "@/components/audio-control";
import { VisualNovelScene } from "@/components/visual-novel";
import { prologueDialogue } from "@/shared/config/prologue-dialogue";

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
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0A0620" }}
    >
      <MoonParticles />

      <div
        className="relative z-10 w-full max-w-[1920px] overflow-hidden bg-transparent"
        style={{
          aspectRatio: "16/9",
          maxHeight: "1080px",
          height: "min(calc(100vh - 4rem), 1080px)",
        }}
      >
        {/* Top Controls - 게임 영역 내부 */}
        <div className="absolute top-0 left-0 right-0 z-50 p-8">
          <div className="flex items-start justify-between gap-4">
            {/* Left side - Navigation buttons */}
            <div className="flex gap-3">
              <motion.button
                style={{
                  padding: "2px 4px",
                }}
                onClick={() => router.push("/")}
                className="px-6 py-2.5 rounded-lg bg-slate-900 bg-opacity-70 backdrop-blur-sm border border-white border-opacity-30 text-white hover:text-gray-200 text-sm font-medium transition-all shadow-lg hover:shadow-white/10"
              >
                <span className="flex items-center gap-2">돌아가기</span>
              </motion.button>
            </div>

            {/* Right side - Progress & Mute button */}
            <div className="flex flex-col gap-3 items-end">
              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="text-xs text-white mr-4">Scene</span>
                <span className="text-xs text-white">
                  {currentSceneIndex + 1} / {prologueDialogue.length}{" "}
                </span>
              </motion.div>

              <MuteButton showAnimation={false} />
            </div>

            <motion.button
              style={{
                padding: "2px 4px",
              }}
              onClick={() => setShowSkipConfirm(true)}
              className="px-6 py-2.5 rounded-lg bg-slate-900 bg-opacity-70 backdrop-blur-sm border border-white border-opacity-30 text-white hover:text-gray-200 text-sm font-medium transition-all shadow-lg hover:shadow-white/10"
            >
              <span className="flex items-center gap-2">건너뛰기</span>
            </motion.button>
          </div>
        </div>

        {/* Visual Novel Scene - 게임 영역 내부 */}
        <VisualNovelScene
          scene={currentScene}
          onNext={handleNext}
          canProceed={true}
        />

        {/* Skip confirmation modal - 게임 영역 내부 */}
        {showSkipConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-100 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => setShowSkipConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-slate-950 bg-opacity-90 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-amber-500 to-orange-600 bg-opacity-20 flex items-center justify-center"
                >
                  <span className="text-4xl">⏭️</span>
                </motion.div>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                  프롤로그를 건너뛰시겠습니까?
                </h3>
                <p className="text-gray-400 text-base">
                  스토리를 나중에 다시 볼 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSkip}
                  className="w-full px-8 py-3 text-base font-bold tracking-wider rounded-xl transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFE5B8 0%, #FFD88A 50%, #D4B887 100%)",
                    boxShadow: "0 8px 30px rgba(255, 229, 184, 0.4)",
                    border: "2px solid rgba(255, 248, 231, 0.5)",
                    color: "#1e293b",
                  }}
                >
                  건너뛰기
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSkipConfirm(false)}
                  className="w-full text-amber-300 hover:text-amber-200 text-sm transition-colors"
                >
                  계속 보기
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
