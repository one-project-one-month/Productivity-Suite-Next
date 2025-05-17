import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addTimerSequence,
  timerSequencePayLoad,
} from "../actions/add-timer-sequence";

export const useAddTimerSequence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: timerSequencePayLoad) => addTimerSequence(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["timer-sequences"],
      });
      toast.success("Timer sequence added successfully");
    },
    onError: () => {
      toast.error("Failed to add timer sequence");
    },
  });
};
