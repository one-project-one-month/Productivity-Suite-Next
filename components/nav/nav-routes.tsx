import { DollarSign, ListTodo, NotebookPen, TimerIcon } from "lucide-react";
import { JSX } from "react";

export type TNavItems = {
  name: string;
  icon: JSX.Element,
  link: string,
  color: string,
}

export const navRoutes: TNavItems[] = [
  {
    name: "Pomodoro Timer",
    icon: <TimerIcon />,
    link: "/pomodoro-timer",
    color: "#ff6b6b",
  },
  {
    name: "To-Do List",
    icon: <ListTodo />,
    link: "/to-do",
    color: "#4ecdc4",
  },
  {
    name: "Notes",
    icon: <NotebookPen />,
    link: "/notes",
    color: "#ffd166",
  },
  {
    name: "Budget Tracker",
    icon: <DollarSign />,
    link: "/budget",
    color: "#6a0572",
  },
];