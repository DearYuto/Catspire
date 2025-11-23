import { Buff, Character, Debuff } from "../types";

export const CharacterService = {
  takeDamage(character: Character, damage: number): Character {
    const actualDamage = Math.max(0, damage - character.block);
    const remainingBlock = Math.max(0, character.block - damage);

    return {
      ...character,
      currentHp: Math.max(0, character.currentHp - actualDamage),
      block: remainingBlock,
    };
  },

  heal(character: Character, amount: number): Character {
    return {
      ...character,
      currentHp: Math.min(character.maxHp, character.currentHp + amount),
    };
  },

  addBlock(character: Character, block: number): Character {
    return {
      ...character,
      block: character.block + block,
    };
  },

  resetBlock(character: Character): Character {
    return {
      ...character,
      block: 0,
    };
  },

  restoreEnergy(character: Character): Character {
    return {
      ...character,
      currentEnergy: character.maxEnergy,
    };
  },

  spendEnergy(character: Character, amount: number): Character {
    return {
      ...character,
      currentEnergy: Math.max(0, character.currentEnergy - amount),
    };
  },

  addBuff(character: Character, buff: Buff): Character {
    return {
      ...character,
      buffs: [...character.buffs, buff],
    };
  },

  addDebuff(character: Character, debuff: Debuff): Character {
    return {
      ...character,
      debuffs: [...character.debuffs, debuff],
    };
  },

  updateStatuses(character: Character): Character {
    return {
      ...character,
      buffs: character.buffs
        .map((buff) => ({ ...buff, duration: buff.duration - 1 }))
        .filter((buff) => buff.duration > 0),
      debuffs: character.debuffs
        .map((debuff) => ({ ...debuff, duration: debuff.duration - 1 }))
        .filter((debuff) => debuff.duration > 0),
    };
  },

  isAlive(character: Character): boolean {
    return character.currentHp > 0;
  },

  addStack(
    character: Character,
    stackType: "moonlight" | "shadow" | "nightmare",
    amount: number
  ): Character {
    const currentStacks = character.stacks || {};
    const currentValue = currentStacks[stackType] || 0;

    return {
      ...character,
      stacks: {
        ...currentStacks,
        [stackType]: currentValue + amount,
      },
    };
  },

  setStack(
    character: Character,
    stackType: "moonlight" | "shadow" | "nightmare",
    amount: number
  ): Character {
    const currentStacks = character.stacks || {};

    return {
      ...character,
      stacks: {
        ...currentStacks,
        [stackType]: Math.max(0, amount),
      },
    };
  },

  consumeStack(
    character: Character,
    stackType: "moonlight" | "shadow" | "nightmare",
    amount?: number
  ): Character {
    const currentStacks = character.stacks || {};
    const currentValue = currentStacks[stackType] || 0;

    // amount가 없으면 전체 소모
    const consumeAmount = amount ?? currentValue;

    return {
      ...character,
      stacks: {
        ...currentStacks,
        [stackType]: Math.max(0, currentValue - consumeAmount),
      },
    };
  },

  getStack(
    character: Character,
    stackType: "moonlight" | "shadow" | "nightmare"
  ): number {
    return character.stacks?.[stackType] || 0;
  },

  checkStackCondition(
    character: Character,
    stackType: "moonlight" | "shadow" | "nightmare",
    operator: ">=" | "<=" | "==" | ">",
    value: number
  ): boolean {
    const currentStack = this.getStack(character, stackType);

    switch (operator) {
      case ">=":
        return currentStack >= value;
      case "<=":
        return currentStack <= value;
      case "==":
        return currentStack === value;
      case ">":
        return currentStack > value;
      default:
        return false;
    }
  },
};
