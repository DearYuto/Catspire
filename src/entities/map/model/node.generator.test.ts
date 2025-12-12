import { expect, test } from "vitest";
import { generateLayers } from "./node.generator";
import { DEFAULT_MAP_CONFIG } from "./map.config";
import { RandomGenerator } from "@/shared/lib/utils/random-generator";

test("첫 번째 노드는 시작 노드이다.", () => {
  // given 맵 기본 설정, 랜덤생성기 준비
  const config = DEFAULT_MAP_CONFIG;
  const randomGenerator = new RandomGenerator(1234);

  // when 레이어 생성하면
  const nodes = generateLayers({ config, randomGenerator });

  // then 0번 레이어의 첫 번째 노드는 시작노드
  const firstNode = nodes[0];
  expect(firstNode.type).toBe("start");
});
