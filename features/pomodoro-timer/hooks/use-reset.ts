import { useMutation } from "@tanstack/react-query";
import { resetDbTimer } from "../actions";

export const useResetTimer = () => {
  return useMutation({
    mutationFn: ({
      timerId,
      remaining,
    }: {
      timerId: string;
      remaining: number;
    }) => resetDbTimer(timerId, remaining),
  });
};
