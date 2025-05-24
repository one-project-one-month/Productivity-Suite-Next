import { create } from "zustand";

type TSelectedPomodoro = {
  selectedId: string;
  setSelectedId: (id: string) => void;
};

export const useSelectedId = create<TSelectedPomodoro>((set) => ({
  selectedId: "",
  setSelectedId: (id: string) => set({ selectedId: id }),
}));
