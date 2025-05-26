import { create } from "zustand";

type State = {
  expenseLayout: string;
  budgetLayout: string;
};

type Actions = {
  setExpenseLayout: (type: string) => void;
  setBudgetLayout: (type: string) => void;
};

type Store = State & Actions;

export const useLayoutStore = create<Store>((set) => ({
  expenseLayout: "LIST",
  budgetLayout: "LIST",
  setExpenseLayout: (type) => set({ expenseLayout: type }),
  setBudgetLayout: (type) => set({ budgetLayout: type }),
}));
