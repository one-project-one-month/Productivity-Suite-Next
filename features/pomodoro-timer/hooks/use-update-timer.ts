import { useMutation } from "@tanstack/react-query";
import { updateTimer } from "../actions";

export const useUpdateTimer = () => {
  return useMutation({
    mutationFn: ({ timerId, remaining }: { timerId: string; remaining: number }) => updateTimer(timerId, remaining),
  });
};
