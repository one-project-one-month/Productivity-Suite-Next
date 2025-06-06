import { useMutation } from "@tanstack/react-query";
import {updateTimerOnPageLoad, ITimerUpdate} from "../actions";

export const useUpdateTimerOnPageLoad = () => {
  return useMutation({
    mutationFn: (data: ITimerUpdate) => updateTimerOnPageLoad(data),
  });
};
