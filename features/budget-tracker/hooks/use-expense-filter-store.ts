import { create } from "zustand";

type State = {
  searchString: string;
  category: string;
  budget: string;
};

type Action = {
  setSearchString: (searchString: string) => void;
  setCategory: (category: string) => void;
  setBudget: (category: string) => void;
};

type Store = State & Action;

export const useExpenseFilterStore = create<Store>((set) => ({
  searchString: "",
  category: "all",
  budget: "all",
  setSearchString: (searchString: string) => set({ searchString }),
  setCategory: (category: string) => set({ category }),
  setBudget: (budget: string) => set({ budget }),
}));
