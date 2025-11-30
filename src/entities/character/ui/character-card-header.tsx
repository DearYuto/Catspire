import Image from "next/image";
import { CharacterCardName } from "./character-card-name";

interface CharacterCardHeaderProps {
  background: string;
  characterImage: string;
  characterName: string;
}

export function CharacterCardHeader({
  background,
  characterImage,
  characterName,
}: CharacterCardHeaderProps) {
  return (
    <div className="bg-opacity-80 relative overflow-hidden rounded-t-2xl bg-slate-900 text-center">
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={background}
            alt={`${characterName} background`}
            fill
            // sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-900" />
        </div>

        <div className="relative" style={{ width: "250px", height: "250px" }}>
          <Image
            src={characterImage}
            alt={characterName}
            fill
            // sizes="313px"
            className="object-contain drop-shadow-2xl"
            priority
          />

          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-36"
            style={{
              background:
                "linear-gradient(to top, rgba(15, 23, 42, 1) 20%, rgba(15, 23, 42, 0.8) 50%, transparent 100%)",
            }}
          />
        </div>

        <CharacterCardName name={characterName} />
      </div>
    </div>
  );
}
