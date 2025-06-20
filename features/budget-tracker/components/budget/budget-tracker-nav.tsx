"use client";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartPie, PlusCircle } from "lucide-react";

const ALLOWED_ROUTES = ["overview", "analytics", "budgets", "expenses"];

const BudgetTrackerNav = () => {
  const router = useRouter();
  const pathName = usePathname();

  const currentTab = pathName.split("/budget-tracker/").pop();

  if (!ALLOWED_ROUTES.includes(currentTab || "")) {
    return;
  }

  const onTabChange = (value: string) => {
    router.push(`/budget-tracker/${value}`);
  };

  return (
    <div
      className={
        "flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center"
      }
    >
      <Tabs value={currentTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
      </Tabs>
      <div>
        <Button asChild={true} variant={"outline"}>
          <Link href={"/budget-tracker/add-expense"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
        </Button>
        <Button asChild={true} className={"ml-4"}>
          <Link href={"/budget-tracker/add-budget"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Budget Plan
          </Link>
        </Button>

        <Button asChild={true} className={"ml-4"}>
          <Link href={"/categories"}>
            <ChartPie className="mr-2 h-4 w-4" /> Categories
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BudgetTrackerNav;
