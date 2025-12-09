"use client";

import Image from "next/image";
import clsx from "clsx";

interface CardFrameProps {
  artSrc: string;
  artAlt?: string;

  cost?: number | string;
  title?: string;
  description?: string;

  width?: number;
  height?: number;

  className?: string;
}

export const CardFrame = ({
  artSrc,
  artAlt = "card illustration",
  cost,
  title,
  description,
  width = 260,
  height = 380,
  className,
}: CardFrameProps) => {
  return (
    <div
      className={clsx("relative cursor-pointer select-none", className)}
      style={{ width, height }}
    >
      <div className="pointer-events-none absolute inset-x-[14%] top-[16%] bottom-[30%] z-10 overflow-hidden rounded-[16px]">
        <Image
          src={artSrc}
          alt={artAlt}
          fill
          className="object-cover"
          sizes={`${width * 0.7}px`}
          priority
        />
      </div>

      <Image
        src="/images/cards/card_frame.png"
        alt="card frame"
        fill
        className="pointer-events-none z-20"
        sizes={`${width}px`}
        priority
      />

      {cost !== undefined && (
        <div className="pointer-events-none absolute top-[4.5%] left-[6.5%] z-30 flex h-[18%] w-[18%] items-center justify-center text-[20px] font-bold text-sky-100 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
          {cost}
        </div>
      )}

      {title && (
        <div className="pointer-events-none absolute top-[12.8%] right-[25%] left-[35%] z-30 truncate text-[13px] leading-tight font-semibold text-slate-900">
          {title}
        </div>
      )}

      {description && (
        <div className="pointer-events-none absolute right-[30%] bottom-[30%] left-[20%] z-30 line-clamp-3 text-[11px] leading-snug text-slate-900">
          {description}
        </div>
      )}
    </div>
  );
};
