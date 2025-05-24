import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { isBefore } from "date-fns";
import { formatDate, numFormatter } from "@/lib/utils";

type BudgetStatusProps = {
  durationTo: Date;
  durationFrom: Date;
  amount: number;
  spent: number;
};

const BudgetStatus = ({
  durationTo,
  amount,
  spent,
  durationFrom,
}: BudgetStatusProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {isBefore(new Date(), durationTo) ? (
              <Badge className={"rounded-lg"}>Active</Badge>
            ) : (
              <Badge className={"rounded-lg"} variant={"destructive"}>
                De-Activated
              </Badge>
            )}
          </TooltipTrigger>
          <TooltipContent>
            From {formatDate(durationFrom)} To {formatDate(durationTo)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {spent > amount && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge className={"rounded-lg"} variant={"destructive"}>
                Exceeded
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {numFormatter.format(spent - amount)} MMK Exceeded
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default BudgetStatus;
