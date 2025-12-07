"use client";

import type { CharacterClass } from "@/entities/character/types";
import { CardService } from "@/entities/card/model/card.service";
import { CardFrame } from "@/entities/card";
import { CHARACTER_BASE_STATS } from "@/entities/character/model/character.stats";
import { useState } from "react";
import Image from "next/image";
import { GameLayout } from "@/shared/layouts/game-layout";

interface GamePageProps {
  characterClass: string;
}

const resolveCharacterClass = (value: string): CharacterClass => {
  if (value === "warrior" || value === "mage" || value === "rogue") {
    return value;
  }

  return "warrior";
};

export const GamePage = ({ characterClass }: GamePageProps) => {
  const resolvedClass = resolveCharacterClass(characterClass);
  const startingDeck = CardService.getStartingCards(resolvedClass);
  const characterStats = CHARACTER_BASE_STATS[resolvedClass];

  const [currentHp] = useState(characterStats.maxHp);
  const [currentEnergy] = useState(characterStats.maxEnergy);

  // 튜토리얼용 손패 구성
  // - 문퍼(warrior)는 루나 플로우 카드가 반드시 손패에 보이도록 맨 앞에 배치
  // - 그 외 클래스는 단순히 앞에서 4장만 사용
  const handCards =
    resolvedClass === "warrior"
      ? [
          ...startingDeck.filter((card) => card.id === "moonpurr_lunar_flow"),
          ...startingDeck.filter((card) => card.id !== "moonpurr_lunar_flow"),
        ].slice(0, 4)
      : startingDeck.slice(0, 4);

  return (
    <GameLayout>
      {/* 상단 전투 필드 영역 */}
      <div className="bg-amber-50">
        <div className="flex h-full flex-col justify-between">
          {/* 상단 정보 / 튜토리얼 텍스트 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">
                {resolvedClass === "warrior" ? "문퍼 튜토리얼" : "튜토리얼"}
              </h1>
              <p className="mt-1 text-sm text-slate-200">
                아래 패에서 카드를 골라 사용하는 방식으로 전투가 진행돼요.
              </p>
            </div>
            <div className="rounded-full bg-black/40 px-4 py-2 text-xs text-slate-200">
              1턴 · 기본 튜토리얼
            </div>
          </div>

          {/* 플레이어 / 적 자리 */}
          <div className="mt-6 flex flex-1 items-center">
            {/* 우리 팀 */}
            <div className="mr-10 flex flex-col gap-4">
              <div className="rounded-xl bg-black/40 px-4 py-3 shadow-lg">
                <div className="text-sm font-semibold">
                  {characterStats.name}
                </div>
                <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full rounded-full bg-emerald-400" />
                </div>
                <div className="mt-1 text-xs text-slate-200">
                  HP {currentHp} / {characterStats.maxHp}
                </div>
                <div className="mt-1 text-xs text-slate-200">
                  Energy {currentEnergy} / {characterStats.maxEnergy}
                </div>
              </div>
            </div>

            {/* 적들 - 문퍼 튜토리얼용 타워 쥐 적 (상단 중앙 배치) */}
            <div className="flex flex-1 justify-center">
              <div className="rounded-xl bg-black/40 px-6 py-4 text-center shadow-lg">
                <div className="mb-2 text-xs tracking-wide text-slate-300 uppercase">
                  튜토리얼 적
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/enemies/entrance/enemy_tower-rat.default.png"
                    alt="tower rat"
                    width={192}
                    height={192}
                    className="h-40 w-40 object-contain"
                  />
                </div>
                <div className="mt-3 h-2 w-24 overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full w-full rounded-full bg-rose-400" />
                </div>
                <div className="mt-1 text-xs text-slate-200">HP 12 / 12</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 패 UI + 에너지 / 턴 종료 버튼 */}
      <div className="h-[450px] border-t border-white/10 bg-linear-to-t from-black via-slate-950 to-slate-900/90 px-6 pt-4 pb-5">
        <div className="mb-3 flex items-center justify-between">
          {/* 에너지 / 리소스 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 shadow-inner shadow-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-lg font-bold">
                3
              </div>
              <div className="text-xs leading-tight text-slate-200">
                <div>에너지</div>
                <div className="text-[11px] text-slate-400">
                  카드를 사용할 때마다 코스트만큼 소모돼요.
                </div>
              </div>
            </div>
          </div>

          {/* 턴 종료 버튼 (아직 동작 없음) */}
          <button className="rounded-xl bg-amber-400 px-6 py-2 text-sm font-bold text-black shadow-lg shadow-amber-500/40 hover:bg-amber-300">
            턴 종료
          </button>
        </div>

        {/* 패 카드 영역 */}
        <div className="flex h-full items-end justify-center gap-6 overflow-x-auto pb-3">
          {handCards.map((card, index) =>
            card.id === "moonpurr_lunar_flow" ? (
              // 루나 플로우 카드는 프레임만 단독으로 보여주고, 호버 시 살짝 떠오르게
              <div
                key={`${card.id}-${index}`}
                className="flex items-end px-4 transition-transform duration-150 hover:-translate-y-4"
              >
                <CardFrame
                  artSrc="/images/cards/card_lunar-flow.png"
                  artAlt="달의 흐름"
                  cost={card.cost}
                  title={card.name}
                  description={card.description}
                  width={190}
                  height={275}
                />
              </div>
            ) : (
              <div
                key={`${card.id}-${index}`}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-700/80 bg-slate-900/95 px-3 py-3 text-xs shadow-lg shadow-black/70 transition-transform duration-150 hover:-translate-y-4 hover:border-sky-400"
              >
                {/* 코스트 */}
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-base font-bold text-black">
                    {card.cost}
                  </div>
                  <span className="text-[10px] text-slate-300 uppercase">
                    {card.type}
                  </span>
                </div>

                {/* 카드 이름 */}
                <div className="mt-3 text-[13px] leading-snug font-semibold">
                  {card.name}
                </div>

                {/* 설명 */}
                <p className="mt-2 line-clamp-4 text-[12px] text-slate-200">
                  {card.description}
                </p>

                {/* 희귀도 배지 */}
                <div className="mt-2 flex justify-end text-[10px]">
                  <span className="rounded-full bg-slate-800/90 px-2 py-0.5 text-slate-300">
                    {card.rarity}
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </GameLayout>
  );
};
