import { ReactNode } from "react";
import BudgetTrackerNav from "@/features/budget-tracker/components/budget/budget-tracker-nav";
import { getUserSession } from "@/lib/server-util";
import { redirect } from "next/navigation";

const BudgetTrackerLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getUserSession();
  if (!session) {
    return redirect("/auth/sign-in");
  }
  return (
    <div className={"px-4 py-6 md:px-6 lg:px-20"}>
      <section>
        <BudgetTrackerNav />
        {children}
      </section>
    </div>
  );
};

export default BudgetTrackerLayout;
