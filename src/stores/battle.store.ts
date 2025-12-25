import type { Card } from "@/entities/card";
import type { Enemy } from "@/entities/enemy/types";
import {
  DeckService,
  type BattleDeck,
} from "@/entities/card/model/deck.service";
import { create } from "zustand";

type TurnPhase = "player" | "enemy";

interface BattleState {
  isActive: boolean;
  turn: number;
  turnPhase: TurnPhase;

  currentEnergy: number;
  maxEnergy: number;
  block: number;
  deck: BattleDeck;

  enemies: Enemy[];

  selectedCardIndex: number | null;
  selectedEnemyIndex: number | null;
}

interface BattleActions {
  initBattle: (params: {
    energy: number;
    cards: Card[];
    enemies: Enemy[];
  }) => void;
  endBattle: () => void;

  drawCards: (count: number) => void;
  playCard: (cardIndex: number) => Card | null;
  discardHand: () => void;
  exhaustCard: (cardIndex: number) => void;

  selectCard: (index: number | null) => void;
  selectEnemy: (index: number | null) => void;

  endPlayerTurn: () => void;
  startPlayerTurn: () => void;

  useEnergy: (amount: number) => boolean;
  addBlock: (amount: number) => void;
  resetBlock: () => void;

  damageEnemy: (enemyIndex: number, damage: number) => void;
  applyEnemyBlock: (enemyIndex: number, block: number) => void;
  removeDeadEnemies: () => void;
  isAllEnemiesDead: () => boolean;
}

type BattleStore = BattleState & BattleActions;

const emptyDeck: BattleDeck = {
  drawPile: [],
  hand: [],
  discardPile: [],
  exhaustPile: [],
};

const initialState: BattleState = {
  isActive: false,
  turn: 0,
  turnPhase: "player",
  currentEnergy: 0,
  maxEnergy: 3,
  block: 0,
  deck: emptyDeck,
  enemies: [],
  selectedCardIndex: null,
  selectedEnemyIndex: null,
};

export const useBattleStore = create<BattleStore>()((set, get) => ({
  ...initialState,

  initBattle: ({ energy, cards, enemies }) => {
    const battleDeck = DeckService.createBattleDeck(cards);
    const deckWithHand = DeckService.drawCards(battleDeck, 5);

    set({
      isActive: true,
      turn: 1,
      turnPhase: "player",
      currentEnergy: energy,
      maxEnergy: energy,
      block: 0,
      deck: deckWithHand,
      enemies,
      selectedCardIndex: null,
      selectedEnemyIndex: null,
    });
  },

  endBattle: () => set(initialState),

  drawCards: (count) => {
    const { deck } = get();
    const newDeck = DeckService.drawCards(deck, count);
    set({ deck: newDeck });
  },

  playCard: (cardIndex) => {
    const { deck } = get();
    const { deck: newDeck, playedCard } = DeckService.playCard(deck, cardIndex);

    set({
      deck: newDeck,
      selectedCardIndex: null,
    });

    return playedCard;
  },

  discardHand: () => {
    const { deck } = get();
    set({ deck: DeckService.discardHand(deck) });
  },

  exhaustCard: (cardIndex) => {
    const { deck } = get();
    set({ deck: DeckService.exhaustCard(deck, cardIndex) });
  },

  selectCard: (index) => set({ selectedCardIndex: index }),
  selectEnemy: (index) => set({ selectedEnemyIndex: index }),

  endPlayerTurn: () => {
    get().discardHand();
    set({
      turnPhase: "enemy",
      selectedCardIndex: null,
      selectedEnemyIndex: null,
    });
  },

  startPlayerTurn: () => {
    const { turn, maxEnergy, deck } = get();
    const newDeck = DeckService.drawCards(deck, 5);

    set({
      turn: turn + 1,
      turnPhase: "player",
      currentEnergy: maxEnergy,
      block: 0,
      deck: newDeck,
    });
  },

  useEnergy: (amount) => {
    const { currentEnergy } = get();
    if (currentEnergy < amount) return false;

    set({ currentEnergy: currentEnergy - amount });
    return true;
  },

  addBlock: (amount) => {
    set({ block: get().block + amount });
  },

  resetBlock: () => set({ block: 0 }),

  damageEnemy: (enemyIndex, damage) => {
    const { enemies } = get();
    const enemy = enemies[enemyIndex];
    if (!enemy) return;

    const enemyBlock = enemy.baseBlock ?? 0;
    const damageToBlock = Math.min(damage, enemyBlock);
    const damageToHp = damage - damageToBlock;

    const newEnemies = enemies.map((e, i) => {
      if (i !== enemyIndex) return e;
      return {
        ...e,
        baseBlock: enemyBlock - damageToBlock,
        baseHP: Math.max(0, e.baseHP - damageToHp),
      };
    });

    set({ enemies: newEnemies });
  },

  applyEnemyBlock: (enemyIndex, block) => {
    const { enemies } = get();
    const newEnemies = enemies.map((e, i) => {
      if (i !== enemyIndex) return e;
      return { ...e, baseBlock: (e.baseBlock ?? 0) + block };
    });
    set({ enemies: newEnemies });
  },

  removeDeadEnemies: () => {
    const { enemies } = get();
    set({ enemies: enemies.filter((e) => e.baseHP > 0) });
  },

  isAllEnemiesDead: () => {
    const { enemies } = get();
    return enemies.length === 0 || enemies.every((e) => e.baseHP <= 0);
  },
}));

export const selectHand = (state: BattleStore): Card[] => state.deck.hand;
export const selectHandSize = (state: BattleStore): number =>
  state.deck.hand.length;

export const selectCanPlayCard = (
  state: BattleStore,
  cardIndex: number,
): boolean => {
  const card = state.deck.hand[cardIndex];
  if (!card) return false;
  return state.currentEnergy >= card.cost && state.turnPhase === "player";
};
