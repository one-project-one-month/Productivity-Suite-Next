import { Badge } from "@/components/ui/badge";
import { TodoStatus as TTodoStatus } from "@/database/enums";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Check, Clock } from "lucide-react";

const todoStatusVariance = cva(["py-2 px-2 rounded-xl"], {
  variants: {
    variant: {
      COMPLETE: [
        "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
      ],
      PENDING: [
        "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
      ],
    },
  },
  defaultVariants: {
    variant: "PENDING",
  },
});

type TodoStatusProps = {
  status: TTodoStatus;
} & VariantProps<typeof todoStatusVariance>;

const TodoStatus = ({ status, variant }: TodoStatusProps) => {
  return (
    <Badge className={cn(todoStatusVariance({ variant }))} variant={"outline"}>
      {status === "PENDING" ? <Clock /> : <Check />}
      <span className={"capitalize"}>{status.toLowerCase()}</span>
    </Badge>
  );
};

export default TodoStatus;
