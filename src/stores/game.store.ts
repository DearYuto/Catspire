import type { Card, Deck } from "@/entities/card";
import type { Character } from "@/entities/character/types";
import type { GeneratedMap, MapNode, NodeState } from "@/entities/map/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GamePhase =
  | "menu"
  | "prologue"
  | "map"
  | "battle"
  | "reward"
  | "shop"
  | "game-over";

interface GameState {
  // 게임 진행
  phase: GamePhase;
  seed: number;

  // 캐릭터
  character: Character | null;
  deck: Deck | null;
  gold: number;

  // 맵
  map: GeneratedMap | null;
  currentNodeId: string | null;
}

interface GameActions {
  // Phase 관리
  setPhase: (phase: GamePhase) => void;

  // 게임 시작/종료
  startNewRun: (params: {
    character: Character;
    deck: Deck;
    map: GeneratedMap;
  }) => void;
  resetGame: () => void;

  // 맵 진행
  enterNode: (nodeId: string) => void;
  completeNode: () => void;
  updateNodeState: (nodeId: string, state: NodeState) => void;

  // 캐릭터 관리
  updateCharacterHp: (hp: number) => void;
  healCharacter: (amount: number) => void;
  damageCharacter: (amount: number) => void;

  // 덱 관리
  addCardToDeck: (card: Card) => void;
  removeCardFromDeck: (cardId: string) => void;

  // 골드 관리
  addGold: (amount: number) => void;
  spendGold: (amount: number) => boolean; // 성공 여부 반환
}


const initialState: GameState = {
  phase: "menu",
  seed: 0,
  character: null,
  deck: null,
  gold: 0,
  map: null,
  currentNodeId: null,
};

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,


      setPhase: (phase) => set({ phase }),

      // 게임 시작/종료
      startNewRun: ({ character, deck, map }) => {
        set({
          phase: "prologue",
          seed: map.seed,
          character,
          deck,
          map,
          gold: 0,
          currentNodeId: null,
        });
      },

      resetGame: () => set(initialState),

      // 맵 진행
      enterNode: (nodeId) => {
        const { map } = get();
        if (!map) return;

        const node = map.nodes.find((n) => n.id === nodeId);
        if (!node || node.state === "locked" || node.state === "completed") {
          return;
        }

        // 현재 노드를 current로, 이전 current는 unlocked로
        const updatedNodes = map.nodes.map((n) => {
          if (n.id === nodeId) {
            return { ...n, state: "current" as const };
          }

          if (n.state === "current") {
            return { ...n, state: "unlocked" as const };
          }
          
          return n;
        });

        set({
          currentNodeId: nodeId,
          map: { ...map, nodes: updatedNodes },
        });
      },

      completeNode: () => {
        const { map, currentNodeId } = get();

        if (!map || !currentNodeId) return;

        const currentNode = map.nodes.find((n) => n.id === currentNodeId);
        if (!currentNode) return;

        // 현재 노드 completed, 연결된 다음 노드들 unlocked
        const updatedNodes = map.nodes.map((n) => {
          if (n.id === currentNodeId) {
            return { ...n, state: "completed" as const };
          }
          
          // 현재 노드와 연결된 다음 노드들을 unlock
          if (currentNode.connections.includes(n.id) && n.state === "locked") {
            return { ...n, state: "unlocked" as const };
          }

          return n;
        });

        set({
          map: { ...map, nodes: updatedNodes },
          currentNodeId: null,
          phase: "map",
        });
      },

      updateNodeState: (nodeId, state) => {
        const { map } = get();
        if (!map) return;

        const updatedNodes = map.nodes.map((n) =>
          n.id === nodeId ? { ...n, state } : n,
        );

        set({ map: { ...map, nodes: updatedNodes } });
      },

      // 캐릭터 관리
      updateCharacterHp: (hp) => {
        const { character } = get();
        if (!character) return;

        const clampedHp = Math.max(0, Math.min(hp, character.maxHp));
        set({
          character: { ...character, currentHp: clampedHp },
        });

        // HP가 0일 때
        if (clampedHp <= 0) {
          set({ phase: "game-over" });
        }
      },

      healCharacter: (amount) => {
        const { character, updateCharacterHp } = get();
        
        if (!character) return;

        updateCharacterHp(character.currentHp + amount);
      },

      damageCharacter: (amount) => {
        const { character, updateCharacterHp } = get();
    
        if (!character) return;

        updateCharacterHp(character.currentHp - amount);
      },

      // 덱 관리
      addCardToDeck: (card) => {
        const { deck } = get();
        if (!deck) return;

        set({
          deck: { ...deck, cards: [...deck.cards, card] },
        });
      },

      removeCardFromDeck: (cardId) => {
        const { deck } = get();
        if (!deck) return;

        // 같은 id의 카드가 여러 장일 수 있으므로 첫 번째만 제거
        const index = deck.cards.findIndex((c) => c.id === cardId);
    
        if (index === -1) return;

        const newCards = [...deck.cards];
        newCards.splice(index, 1);

        set({
          deck: { ...deck, cards: newCards },
        });
      },

      // 골드 관리
      addGold: (amount) => {
        set({ gold: get().gold + amount });
      },

      spendGold: (amount) => {
        const { gold } = get();
        if (gold < amount) return false;

        set({ gold: gold - amount });
        return true;
      },
    }),
    {
      name: "catspire-game",
      partialize: (state) => ({
        phase: state.phase,
        seed: state.seed,
        character: state.character,
        deck: state.deck,
        gold: state.gold,
        map: state.map,
        currentNodeId: state.currentNodeId,
      }),
    },
  ),
);

export const selectCurrentNode = (state: GameStore): MapNode | null => {
  if (!state.map || !state.currentNodeId) return null;
  return state.map.nodes.find((n) => n.id === state.currentNodeId) ?? null;
};

export const selectUnlockedNodes = (state: GameStore): MapNode[] => {
  if (!state.map) return [];
  return state.map.nodes.filter((n) => n.state === "unlocked") as MapNode[];
};

export const selectIsGameOver = (state: GameStore): boolean => {
  return state.phase === "game-over";
};
