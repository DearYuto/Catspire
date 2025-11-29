"use client";

import { motion, AnimatePresence } from "framer-motion";
// import { useGameStore } from "@/features/game-progress";
import { useEffect, useState } from "react";

interface MuteButtonProps {
  showAnimation?: boolean;
}

export function MuteButton({ showAnimation = false }: MuteButtonProps) {
  const [mounted, setMounted] = useState(true);
  // const isMuted = useGameStore((state) => state.isMuted);
  // const toggleMute = useGameStore((state) => state.toggleMute);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={showAnimation ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: showAnimation ? 0.8 : 0,
        delay: showAnimation ? 2 : 0,
      }}
      className="fixed top-6 right-6 z-50"
    >
      <motion.button
        // onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group bg-opacity-40 hover:bg-opacity-60 relative h-12 w-12 rounded-full bg-slate-900 backdrop-blur-sm transition-all"
      >
        <AnimatePresence mode="wait">
          {/* {isMuted ? (
            <motion.div
              key="muted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="absolute inset-0 flex items-center justify-center text-xl opacity-70 group-hover:opacity-100 transition-opacity"
            >
              🔇
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="absolute inset-0 flex items-center justify-center text-xl opacity-70 group-hover:opacity-100 transition-opacity"
            >
              🔊
            </motion.div>
          )} */}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
