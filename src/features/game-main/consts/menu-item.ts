export interface MenuItem {
  id: string;
  label: string;
  path: string;
  variant: "gold" | "purple";
  textColor: "white" | "purple";
}

export const menuItems: MenuItem[] = [
  {
    id: "story",
    label: "시나리오 보기",
    path: "/story",
    variant: "purple",
    textColor: "white",
  },
  {
    id: "character-select",
    label: "클래스 선택",
    path: "/character-select",
    variant: "gold",
    textColor: "purple",
  },
];
