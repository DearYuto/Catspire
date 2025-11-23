export interface Enemy {
  id: string;
  name: string;
  maxHp: number;
  currentHp: number;
  actions: EnemyAction[];
  currentAction?: EnemyAction;
  intent?: string;
  isElite?: boolean;
  isBoss?: boolean;
  loot?: Loot;
  description?: string;
  image?: string;
}

export interface EnemyAction {
  type: "attack" | "defend" | "buff" | "debuff" | "special";
  damage?: number;
  block?: number;
  value?: number;
  description: string;
}

export interface Loot {
  moonShards: number;
  cardRewards?: number;
  relic?: string;
}
