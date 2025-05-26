import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BudgetsLoading = () => {
  return (
    <div
      className={
        "mt-4 md:mt-6 p-6  border-1 border-black/40 rounded-xl bg-card text-card-foreground"
      }
    >
      <h2 className={"font-bold text-2xl"}>Your Budget Plans</h2>
      <p className={"mb-4 text-gray-500 "}>
        Manage your existing budget plans or create new one.
      </p>
      <div
        className={
          "max-h-[50vh] md:max-h-[65vh] lg:max-h-[50vh]  overflow-y-scroll pr-4"
        }
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton className={"w-full h-28 mt-4"} key={idx} />
        ))}
      </div>
      <Button disabled={true} className={"mt-6"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Budget Plan
      </Button>
    </div>
  );
};

export default BudgetsLoading;
