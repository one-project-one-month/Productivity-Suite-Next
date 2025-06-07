import { useQuery } from "@tanstack/react-query";
import { getTimerSequenceById } from "../actions";

export const useGetSequenceByTimerId = (timerId: string) => {
  return useQuery({
    queryKey: ["timerSequence", timerId],
    queryFn: () => getTimerSequenceById(timerId),
    enabled: !!timerId,
    refetchOnWindowFocus: false,
  });
};
