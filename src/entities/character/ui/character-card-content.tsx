import { motion } from "framer-motion";
import { Button } from "@/shared/components";

interface CharacterCardContentProps {
  description: string;
  passive: string;
  lore: string;
  features: readonly string[];
  difficulty: string;
  animationDelay: number;
}

export function CharacterCardContent({
  description,
  passive,
  lore,
  features,
  difficulty,
  animationDelay,
}: CharacterCardContentProps) {
  return (
    <div
      className="flex flex-1 flex-col gap-4"
      style={{
        padding: "24px",
        paddingTop: "20px",
        paddingBottom: "24px",
      }}
    >
      <p className="text-base leading-relaxed text-gray-300">{description}</p>

      {passive && (
        <p
          className="ounded-r relative bg-slate-800/30 text-sm leading-relaxed font-semibold text-amber-300 backdrop-blur-sm before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-l before:bg-amber-500 before:content-['']"
          style={{ paddingLeft: "20px" }}
        >
          {passive}
        </p>
      )}

      {lore && (
        <div className="rounded bg-slate-800/30 px-4 py-3 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-gray-400 italic">{lore}</p>
        </div>
      )}

      <div className="mb-4">
        <h4 className="mb-3 text-sm font-bold text-amber-300">특징:</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: animationDelay + 0.2 + index * 0.1 }}
              className="flex items-center gap-2 text-sm leading-relaxed text-gray-400"
            >
              <span className="text-amber-400">✓</span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-400">
        <span>난이도:</span>
        <span>{difficulty}</span>
      </div>

      <div className="flex-1" />

      <div className="mt-auto">
        <Button
          variant="custom"
          className="w-full rounded-xl text-base font-bold tracking-wider transition-all hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, #FFE5B8 0%, #FFD88A 50%, #D4B887 100%)",
            boxShadow: "0 8px 30px rgba(255, 229, 184, 0.4)",
            border: "2px solid rgba(255, 248, 231, 0.5)",
            color: "#1e293b",
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <span>선택하기</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
        </Button>
      </div>
    </div>
  );
}
