import { create } from "zustand";

type State = {
  searchString: string;
  category: string;
  status: string;
};

type Action = {
  setSearchString: (searchString: string) => void;
  setCategory: (category: string) => void;
  setStatus: (status: string) => void;
};

type Store = State & Action;

export const useBudgetFilterStore = create<Store>((set) => ({
  searchString: "",
  category: "",
  status: "",
  setSearchString: (searchString: string) => set({ searchString }),
  setCategory: (category: string) => set({ category }),
  setStatus: (status: string) => set({ status }),
}));
