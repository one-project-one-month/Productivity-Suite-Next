import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AddBudgetLoading = () => {
  return (
    <div className={"w-full flex justify-center"}>
      <Card className={"w-full md:max-w-[500px] lg:max-w-[600px]"}>
        <CardHeader>
          <h2 className={"font-bold text-lg md:text-xl lg:text-2xl"}>
            Create New Budget Plan
          </h2>
          <p className={"mb-4 text-gray-400 font-semibold"}>
            Define a new budget plan with a title, description, category, and
            amount.
          </p>
        </CardHeader>
        <CardContent>
          <div className={"mb-4"}>
            <Skeleton className={"w-full h-6 mb-2"} />
            <Skeleton className={"w-full h-12"} />
          </div>
          <div className={"mb-4"}>
            <Skeleton className={"w-full h-6 mb-2"} />
            <Skeleton className={"w-full h-16"} />
          </div>
          <div className={"mb-4"}>
            <Skeleton className={"w-full h-6 mb-2"} />
            <Skeleton className={"w-full h-12"} />
          </div>
          <div className={"mb-4"}>
            <Skeleton className={"w-full h-6 mb-2"} />
            <Skeleton className={"w-full h-12"} />
          </div>
          <div className={"w-full flex justify-between items-center"}>
            <div className={"w-[45%] mb-4"}>
              <Skeleton className={"w-full h-6 mb-2"} />
              <Skeleton className={"w-full h-8"} />
            </div>
            <div className={"w-[45%] mb-4"}>
              <Skeleton className={"w-full h-6 mb-2"} />
              <Skeleton className={"w-full h-8"} />
            </div>
          </div>

          <div className={"flex items-center justify-between"}>
            <Skeleton className={"w-[100px] h-8"} />
            <Skeleton className={"w-[100px] h-8"} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBudgetLoading;
