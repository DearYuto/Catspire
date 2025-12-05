export type EnemyTier = "normal" | "elite" | "boss";

export interface Enemy {
  id: string;
  name: string;
  tier: EnemyTier;
  maxHp: number;
  currentHp: number;
  actions: EnemyAction[];
  currentAction?: EnemyAction;
  intent?: string;
  description?: string;
  image?: string;
  rewards?: EnemyRewards;
}

export type EnemyPattern = {
  turn: number | "repeat";
  actionId: string;
};

export interface EnemyAction {
  id: string;
  name: string;
  type: "attack" | "defend" | "buff" | "debuff" | "special";
  intent: string;
  damage?: number;
  block?: number;
  value?: number;
  description: string;
  pattern?: EnemyPattern[];
}

export interface EnemyRewards {
  gold: {
    min: number;
    max: number;
  };
  items?: {
    id: string;
    name: string;
    description: string;
    image: string;
  }[];
}
