import type { DialogueScene } from "./prologue-dialogue";

export const moonPurrPrologueDialogue: DialogueScene[] = [
  {
    background: "/images/backgrounds/scene_ tower_entrance.png",
    text: "문퍼는 조용히 숨을 들이쉬고, 달탑의 첫 계단을 밟았다.",
    textSpeed: 40,
  },
  {
    background: "/images/backgrounds/scene_ tower_entrance.png",
    text: "달빛의 흐름이 그를 감싸며—",
    textSpeed: 40,
  },
  {
    background: "/images/backgrounds/scene_ tower_entrance.png",
    text: "문퍼의 여정이 시작된다.",
    textSpeed: 40,
  },
].map((scene, index) => ({
  id: index + 1,
  ...scene,
}));
