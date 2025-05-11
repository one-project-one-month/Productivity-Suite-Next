import { ReactNode } from "react";
import BudgetTrackerNav from "@/features/budget-tracker/components/budget-tracker-nav";

const BudgetTrackerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className={"px-4 py-6 md:px-6 lg:px-20"}>
        <section>
          <BudgetTrackerNav />
          {children}
        </section>
      </div>
    </main>
  );
};

export default BudgetTrackerLayout;
