import { motion } from "framer-motion";

const YEAR = 2025;
const VERSION = "1.0.0 Alpha";
const COPYRIGHT = `© ${YEAR} Catspire. All rights reserved.`;

export const HomeFooter = ({ isFirstVisit }: { isFirstVisit: boolean }) => {
  return (
    <motion.div
      initial={isFirstVisit ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay: isFirstVisit ? 2 : 0 }}
      className="fixed bottom-6 left-0 right-0 text-center text-xs z-10"
      style={{
        color: "#FFE5B8",
        textShadow: "0 0 15px rgba(255, 229, 184, 0.5)",
      }}
    >
      <p>{VERSION}</p>
      <p className="mt-1">{COPYRIGHT}</p>
    </motion.div>
  );
};
