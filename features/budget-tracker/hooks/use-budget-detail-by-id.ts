import { useQuery } from "@tanstack/react-query";
import { getBudgetDetailsById } from "@/features/budget-tracker/actions/get-budget-details-by-id";

export const useBudgetDetailById = (id: string) => {
  return useQuery({
    queryFn: () => getBudgetDetailsById(id),
    queryKey: ["budget", { id }],
    staleTime: 60 * 60 * 1000,
    enabled: !!id,
  });
};
