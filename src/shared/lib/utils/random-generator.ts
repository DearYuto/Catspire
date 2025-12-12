export class RandomGenerator {
  private seed: number;

  constructor(seed?: number) {
    this.seed = seed ?? Math.floor(Math.random() * 10000);
  }

  getSeed() {
    return this.seed;
  }

  // LGC 알고리즘 (0~1 사이의 랜덤 수 생성)
  next() {
    const a = 9301;
    const c = 49297;
    const m = 233280;

    this.seed = (a * this.seed + c) % m;
    return this.seed / m;
  }

  // min ~ max 사이 랜덤 정수
  between(min: number, max: number) {
    const random = this.next();
    const range = max - min + 1;

    return Math.floor(random * range) + min;
  }

  shuffle<T>(array: readonly T[]): T[] {
    const result = [...array];

    // 뒤에서부터 랜덤 위치 교환
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  // 확률 체크
  chance(probability: number) {
    return this.next() < probability;
  }

  pick<T>(array: readonly T[]): T | undefined {
    if (array.length === 0) return undefined;

    const index = Math.floor(this.next() * array.length);
    return array[index];
  }
}
