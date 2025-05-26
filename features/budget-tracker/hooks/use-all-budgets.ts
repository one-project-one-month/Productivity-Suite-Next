import { useQuery } from "@tanstack/react-query";
import { getAllBudgets } from "@/features/budget-tracker/actions/get-all-budgets";

export const useAllBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getAllBudgets,
    staleTime: 60 * 60 * 1000,
  });
};
