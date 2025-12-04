import Image from "next/image";

interface CardDecorationProps {
  src?: string;
  alt?: string;
}

export function CardDecoration({
  src = "/images/decoration/decoration_card.top.png",
  alt = "decoration",
}: CardDecorationProps) {
  return (
    <div
      className="pointer-events-none absolute top-0 right-0 left-0 -translate-y-1/3"
      style={{ zIndex: 60 }}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={60}
        className="h-auto w-full"
        priority
      />
    </div>
  );
}
