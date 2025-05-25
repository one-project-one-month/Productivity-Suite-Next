import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllBudgets } from "@/features/budget-tracker/actions/get-all-budgets";
import NewExpenseForm from "@/features/budget-tracker/components/form/new-expense-form";
import { notFound } from "next/navigation";

const AddExpensePage = async () => {
  const budgets = await getAllBudgets();
  if (!budgets) {
    return notFound();
  }
  return (
    <div className={"w-full flex justify-center"}>
      <Card className={"w-full md:max-w-[500px] lg:max-w-[600px]"}>
        <CardHeader>
          <h2 className={"font-bold text-lg md:text-xl lg:text-2xl"}>
            Add New Expense
          </h2>
          <p className={"mb-4 text-gray-400 font-semibold"}>
            Record a new expense against one of your budget plans.
          </p>
        </CardHeader>
        <CardContent>
          <NewExpenseForm budgets={budgets} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpensePage;
