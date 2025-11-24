import Image from "next/image";

interface CardDecorationProps {
  src?: string;
  alt?: string;
}

export function CardDecoration({
  src = "/images/decoration/deco_top.png",
  alt = "decoration",
}: CardDecorationProps) {
  return (
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none -translate-y-1/3"
      style={{ zIndex: 60 }}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={60}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
