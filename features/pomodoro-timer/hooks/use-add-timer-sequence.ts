import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addTimerSequence,
  timerSequencePayLoad,
} from "../actions/add-timer-sequence";
import {
  addTimer,
  addTimerSequenceToDb,
  ITimer,
  ITimerSequence,
} from "../actions";

export const useAddTimerSequence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: timerSequencePayLoad) => addTimerSequence(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["sequences"],
      });
      toast.success("Timer sequence added successfully");
    },
    onError: () => {
      toast.error("Failed to add timer sequence");
    },
  });
};

export const useAddTimer = () => {
  return useMutation({
    mutationFn: (data: ITimer) => addTimer(data),
  });
};

export const useAddTimerSequenceToDb = () => {
  return useMutation({
    mutationFn: (data: ITimerSequence) => addTimerSequenceToDb(data),
  });
};
