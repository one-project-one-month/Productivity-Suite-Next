import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ExpensesLoading = () => {
  return (
    <div
      className={
        "mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl bg-card text-card-foreground"
      }
    >
      <h2 className={"font-bold text-2xl"}>All Expenses</h2>
      <p className={"mb-4 text-gray-500 "}>
        View and manage all your recorded expenses.
      </p>
      <div
        className={
          "max-h-[50vh] md:max-h-[65vh] lg:max-h-[50vh] overflow-y-scroll pr-4"
        }
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton className={"mt-4 w-full h-20"} key={idx} />
        ))}
      </div>
      <Button className={"mt-6"} variant={"outline"} disabled={true}>
        <PlusCircle className="mr-2 h-4 w-4" />
        <span>Add Expense</span>
      </Button>
    </div>
  );
};

export default ExpensesLoading;
