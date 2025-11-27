interface CardHolographicOverlayProps {
  holoX: number;
  holoY: number;
}

export function CardHolographicOverlay({
  holoX,
  holoY,
}: CardHolographicOverlayProps) {
  return (
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-50"
      suppressHydrationWarning
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              115deg,
              transparent 0%,
              rgba(147, 197, 253, 0.05) ${holoX * 0.3}%,
              rgba(167, 139, 250, 0.1) ${holoX * 0.5}%,
              rgba(236, 72, 153, 0.08) ${holoX * 0.7}%,
              transparent 100%
            ),
            linear-gradient(
              245deg,
              transparent 0%,
              rgba(251, 146, 60, 0.05) ${holoY * 0.3}%,
              rgba(236, 72, 153, 0.1) ${holoY * 0.5}%,
              rgba(167, 139, 250, 0.08) ${holoY * 0.7}%,
              transparent 100%
            )
          `,
          mixBlendMode: "color-dodge",
        }}
        suppressHydrationWarning
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              ${115 + (holoX - 50) * 0.5}deg,
              transparent 20%,
              rgba(255, 255, 255, 0.03) 45%,
              rgba(147, 197, 253, 0.08) 50%,
              rgba(255, 255, 255, 0.03) 55%,
              transparent 80%
            )
          `,
          transform: `translateX(${(holoX - 50) * 0.3}px) translateY(${
            (holoY - 50) * 0.3
          }px)`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
