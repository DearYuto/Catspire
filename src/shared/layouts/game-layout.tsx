import { MoonParticles } from "../components/effects/moon-particles";

export const GameLayout = ({ children }: { children: React.ReactNode }) => {
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
        {children}
      </div>
    </main>
  );
};
