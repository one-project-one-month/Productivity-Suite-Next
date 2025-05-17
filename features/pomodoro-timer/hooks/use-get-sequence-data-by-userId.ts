import { useQuery } from "@tanstack/react-query";
import { getSequenceByUserId } from "../actions/get-sequence-by-userId";

export const useGetSequenceDataByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["sequences", { userId }],
    queryFn: () => getSequenceByUserId(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000,
  });
};
