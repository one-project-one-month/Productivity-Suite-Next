import { cva, VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const priorityVariance = cva(["py-2 px-2 rounded-xl"], {
  variants: {
    priority: {
      LOW: [
        "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800",
      ],
      MEDIUM: [
        "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
      ],
      HIGH: ["bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800"],
      IMPORTANT: [
        "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800",
      ],
    },
  },
  defaultVariants: {
    priority: "LOW",
  },
});

type PriorityBadgeProps = {
  children: ReactNode;
} & VariantProps<typeof priorityVariance>;
const PriorityBadge = ({ priority, children }: PriorityBadgeProps) => {
  return (
    <Badge className={cn(priorityVariance({ priority }))} variant={"outline"}>
      {children}
    </Badge>
  );
};

export default PriorityBadge;
