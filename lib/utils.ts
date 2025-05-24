import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { Category } from "@/database/interfaces.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | string) => {
  return format(date, "MMM d, yyyy");
};

export const formatHeatmapDate = (date: Date | string) => {
  return format(date, "yyyy-MM-dd");
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const numFormatter = new Intl.NumberFormat("en-US", {
  maximumSignificantDigits: 3,
});

export const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

export const parsePriority = (i: number, isSnake: boolean = true) => {
  const p = ["very_low", "low", "medium", "high", "very_high"];
  return isSnake ? p[i - 1] : p[i - 1].replace("_", " ");
};

export const transformCategoryIntoChartLabel = (data: Category[]) => {
  return data.reduce(
    (acc, curr) => {
      const temp = {
        [curr.name]: {
          label: curr.name,
          color: curr.color,
        },
      };
      return { ...acc, ...temp };
    },
    {} as Record<string, Record<string, string>>,
  );
};
