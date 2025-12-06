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
  pattern?: EnemyPattern[];
  passiveEffects?: EnemyPassiveEffect[];
}

export interface EnemyPassiveEffect {
  id: string;
  name: string;
  description: string;
  trigger: "turn_start" | "turn_end" | "on_death" | "on_damage" | "on_heal";
  effect: {
    type: "evade" | "block" | "damage" | "heal";
    value: number;
  };
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
  hits?: number;
  block?: number;
  value?: number;
  description: string;
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
