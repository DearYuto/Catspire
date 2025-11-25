export interface DialogueScene {
  id: number;
  background?: string;
  character?: {
    sprite: string;
    name: string;
    position: "left" | "right";
  };
  speaker?: string;
  text: string;
  textSpeed?: number;
}

export const prologueDialogue: DialogueScene[] = [
  {
    background: "/images/backgrounds/scene_darkness.png",
    text: "냥토 왕국에 달빛이 사라진 날—",
    textSpeed: 40,
  },
  {
    background: "/images/backgrounds/scene_moon_shard.png",
    text: "달의 파편(Moon Shard)이 흩어지며",
    textSpeed: 40,
  },
  {
    background: "/images/backgrounds/scene_mysterious_tower.png",
    text: "신비로운 탑이 생겨났다.",
    textSpeed: 40,
  },
  {
    background: "/images/backgrounds/scene_monster_night.png",
    text: "달빛의 힘을 잃은 왕국은 어둠에 잠식되기 시작했고, 달의 몬스터들이 밤마다 출몰하기 시작했다.",
    textSpeed: 40,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "...이상해. 달빛의 흐름이 완전히 끊겼어.",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "이대로라면 왕국이 어둠에 잠식될 거야...",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "달의 파편을 되찾아야 해. 하지만 탑은... 보통 고양이가 들어갈 수 있는 곳이 아니야.",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "달빛의 잔향을 더 강하게 느끼는 건... 너뿐이야.",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "탑에 들어갈 수 있는 힘도. 그리고...",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "무토를 막을 수 있는 고양이도.",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "무토는... 이미 탑으로 향했어. 혼자서.",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "그는 달의 부름을 듣고 있어. 과거의 사건 이후로 계속...",
    textSpeed: 35,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "부탁이야.",
    textSpeed: 30,
  },
  {
    background: "/images/backgrounds/scene_yuto_bg.png",
    character: {
      sprite: "/images/characters/yuto_worried.png",
      name: "Yuto",
      position: "left" as const,
    },
    speaker: "유토",
    text: "무토를 막아줘. 아니.. 다시 데려와줘.",
    textSpeed: 30,
  },
  {
    background: "/images/backgrounds/scene_ tower_entrance.png",
    text: "당신은 달의 파편을 되찾고, 무토를 구할 수 있을까?",
    textSpeed: 40,
  },
  {
    background: "/images/backgrounds/scene_ tower_entrance.png",
    text: "50층의 달탑을 오르는 여정이 시작된다…",
    textSpeed: 40,
  },
].map((scene, index) => ({
  id: index + 1,
  ...scene,
}));
