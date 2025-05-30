import { Button } from "@/components/ui/button";
import { ArrowLeft, ChartPie, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllCategories } from "@/lib/category-action";
import { notFound } from "next/navigation";
import PredefinedCategoryList from "@/components/category/predefined-category-list";
import UserDefinedCategoryList from "@/components/category/user-defined-category-list";

const CategoriesPage = async () => {
  const data = await getAllCategories();
  if (!data) {
    return notFound();
  }
  return (
    <div className={"px-4 py-6 md:px-6 lg:px-20"}>
      {/*Back Link*/}
      <Button asChild={true} className={"my-4"}>
        <Link href={"/budget-tracker/budgets"}>
          <ArrowLeft />
          Back to Budgets
        </Link>
      </Button>
      <Card className={"max-w-[800px] mx-auto"}>
        <CardHeader>
          <h2 className={"font-bold text-2xl flex items-center gap-x-2"}>
            <ChartPie className="mr-2 aspect-square h-6" />
            Category Management
          </h2>
          <p className={"mb-4 text-gray-400 font-semibold"}>
            Create and customize your budget categories with personalized
            colors.
          </p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Categories
          </Button>
        </CardHeader>
        <CardContent>
          <PredefinedCategoryList data={data.preDefined} />
          <UserDefinedCategoryList data={data.userDefined} />
          <div
            className={"mt-8 p-6 bg-accent text-muted-foreground rounded-lg"}
          >
            <h3 className={"font-bold md:text-lg"}>
              How to use custom categories:
            </h3>
            <ul className={"list-disc px-4"}>
              <li>Create categories that match your spending habits</li>
              <li>
                Choose colors that help you quickly identify different types of
                expenses
              </li>
              <li>
                Default categories cannot be deleted but can be customized
              </li>
              <li>
                Your custom categories will appear in budget and expense forms
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
