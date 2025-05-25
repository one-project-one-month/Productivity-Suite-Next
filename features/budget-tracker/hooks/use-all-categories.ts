import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/features/budget-tracker/actions/get-all-categories";

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 60 * 60 * 1000,
  });
};
