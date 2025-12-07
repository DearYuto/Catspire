import { GameLayout } from "@/shared/layouts/game-layout";

const MapPage = () => {
  return (
    <GameLayout>
      <div className="h-full bg-amber-50">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Map</h1>
            </div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default MapPage;
