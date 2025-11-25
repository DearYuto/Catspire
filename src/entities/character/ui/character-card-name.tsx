interface CharacterCardNameProps {
  name: string;
}

export function CharacterCardName({ name }: CharacterCardNameProps) {
  return (
    <div className="w-full absolute bottom-6 left-1/2 -translate-x-1/2">
      <div className="relative group/name">
        <div className="absolute -inset-2 bg-linear-to-r from-amber-500/30 via-yellow-400/20 to-amber-500/30 rounded-2xl blur-2xl opacity-0 group-hover/name:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          <div className="relative bg-linear-to-br">
            <div className="absolute top-[-4px] left-8 right-8 h-px bg-linear-to-r from-transparent via-amber-200/50 to-transparent" />

            <h3
              className="text-2xl font-black tracking-wider"
              style={{
                background:
                  "linear-gradient(135deg, #fef3c7 0%, #fde68a 20%, #fbbf24 40%, #f59e0b 60%, #fbbf24 80%, #fde68a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {name}
            </h3>

            <div className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-amber-400/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
