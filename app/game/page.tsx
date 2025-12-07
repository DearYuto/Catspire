import { GamePage } from "@/views/game/game-page";

interface GamePageProps {
  searchParams: { characterClass: string };
}

export default async function Page({ searchParams }: GamePageProps) {
  const { characterClass } = await searchParams;

  return <GamePage characterClass={characterClass} />;
}
