import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePomodoro } from "../actions";
import { toast } from "sonner";

export function useDeleteSequence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePomodoro(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["sequences"],
      });
      toast.message("Deleted Successfully");
    },
    onError: () => toast.error("Failed to delete sequence"),
  });
}
