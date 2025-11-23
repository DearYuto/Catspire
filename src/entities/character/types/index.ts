export type CharacterClass = "warrior" | "mage" | "rogue";

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  maxHp: number;
  currentHp: number;
  maxEnergy: number;
  currentEnergy: number;
  block: number;
  buffs: Buff[];
  debuffs: Debuff[];
  avatar?: string;

  // 클래스별 스택 시스템
  stacks?: {
    moonlight?: number; // 문퍼 달빛 스택
    shadow?: number; // 섀도포 그림자 스택
    nightmare?: number; // 드림테일 악몽 스택
  };
}

export interface Buff {
  id: string;
  name: string;
  type: "strength" | "defense" | "energy" | "draw";
  value: number;
  duration: number;
  description: string;
}

export interface Debuff {
  id: string;
  name: string;
  type: "weak" | "vulnerable" | "poison" | "stun";
  value: number;
  duration: number;
  description: string;
}
