"use client";

import { Button } from "@/shared/components/button/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { menuItems } from "../consts/menu-item";
import { AnimatedMenuButton } from "./animated-menu-button";

export const IntroButtons = ({ initAnimation }: { initAnimation: boolean }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="min-h-[200px]">
      <AnimatePresence mode="wait">
        {showOptions ? (
          <ReturnButtonArea returnFn={() => setShowOptions(false)} />
        ) : (
          <StartButtonArea
            initAnimation={initAnimation}
            setShowOptions={setShowOptions}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface StartButtonAreaProps {
  initAnimation: boolean;
  setShowOptions: (showOptions: boolean) => void;
}
const StartButtonArea = ({
  initAnimation,
  setShowOptions,
}: StartButtonAreaProps) => {
  return (
    <motion.div
      key="start"
      initial={initAnimation ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: initAnimation ? 0.8 : 0,
        delay: initAnimation ? 1.5 : 0,
      }}
      className="mt-4 flex flex-col items-center gap-4"
    >
      <StartButton startFn={() => setShowOptions(true)} />
      <StartText />
    </motion.div>
  );
};

const StartText = () => {
  return (
    <motion.p
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity }}
      className="text-sm font-light tracking-[0.3em] text-amber-200"
    >
      PRESS START TO BEGIN YOUR JOURNEY
    </motion.p>
  );
};

const StartButton = ({ startFn }: { startFn: () => void }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button onClick={() => startFn()} unstyled className="btn btn-gold">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-40"
        />
        <div className="relative z-10 flex items-center justify-center gap-3 text-slate-900 transition-colors group-hover:text-slate-800">
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ✨
          </motion.span>
          <span className="text-default text-base font-bold">START</span>
          <motion.span
            animate={{ rotate: [360, 0] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ✨
          </motion.span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity group-hover:opacity-20" />
      </Button>
    </motion.div>
  );
};

const ReturnButtonArea = ({ returnFn }: { returnFn: () => void }) => {
  return (
    <motion.div
      key="options"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 flex flex-col items-center gap-4"
    >
      {menuItems.map((item) => (
        <AnimatedMenuButton key={item.id} item={item} />
      ))}
      <ReturnButton returnFn={returnFn} />
    </motion.div>
  );
};

const ReturnButton = ({ returnFn }: { returnFn: () => void }) => {
  return (
    <motion.button
      onClick={() => returnFn()}
      whileHover={{ scale: 1.1 }}
      className="btn text-gold mt-2 cursor-pointer font-medium"
    >
      ← 돌아가기
    </motion.button>
  );
};
