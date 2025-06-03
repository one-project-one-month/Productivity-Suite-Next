import { TodoPriority } from "@/database/enums";
import { create } from "zustand";

type State = {
  priority: TodoPriority | "all";
};

type Action = {
  setPriority: (priority: TodoPriority | "all") => void;
};

type Store = State & Action;

export const useTodoFilterStore = create<Store>((set) => ({
  priority: "all",
  setPriority: (priority) => set({ priority }),
}));
