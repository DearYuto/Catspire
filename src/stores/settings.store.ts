import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isMuted: boolean;
  musicVolume: number;
  sfxVolume: number;
}

interface SettingsActions {
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      isMuted: false,
      musicVolume: 0.7,
      sfxVolume: 1.0,

      toggleMute: () => set({ isMuted: !get().isMuted }),

      setMuted: (muted) => set({ isMuted: muted }),

      setMusicVolume: (volume) =>
        set({ musicVolume: Math.max(0, Math.min(1, volume)) }),

      setSfxVolume: (volume) =>
        set({ sfxVolume: Math.max(0, Math.min(1, volume)) }),
    }),
    {
      name: "catspire-settings",
    },
  ),
);
