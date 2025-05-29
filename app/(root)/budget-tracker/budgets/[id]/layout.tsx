import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const BudgetDetailLayout = ({
  children,
  expense,
  analytics,
}: {
  children: ReactNode;
  expense: ReactNode;
  analytics: ReactNode;
}) => {
  return (
    <>
      {children}
      <Tabs defaultValue="expense" className="mt-8 w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="expense" asChild={true}>
            <Link href={"#expense"}>Expense</Link>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Link href={"#analytics"}>Analytics</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"expense"} id="expense">
          {expense}
        </TabsContent>
        <TabsContent value={"analytics"} id={"analytics"}>
          {analytics}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default BudgetDetailLayout;
