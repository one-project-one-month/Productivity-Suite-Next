import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllCategories } from "@/features/budget-tracker/actions/get-all-categories";
import NewBudgetForm from "@/features/budget-tracker/components/new-budget-form";
import { notFound } from "next/navigation";

const AddBudgetPage = async () => {
  const categories = await getAllCategories();
  if (!categories) {
    return notFound();
  }
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
          <NewBudgetForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBudgetPage;
