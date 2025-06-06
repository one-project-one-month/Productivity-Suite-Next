import { Suspense } from "react";
import NumbersLoading from "./numbers-loading";

export default function CommunityCard({
  num,
  desc,
  icon,
}: {
  num: number;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-white/10 border border-white/10 text-center rounded-md shadow-lg shadow-black/15 py-7 text-black hover:scale-[1.01] hover:shadow-black/20 transition-all">
      <p className="size-14 grid place-items-center w-max mx-auto rounded-lg bg-gradient-to-b from-blue-600 to-purple-600 p-3 text-white">
        {icon}
      </p>
      {/* <Users className="size-14 rounded-lg bg-gradient-to-b from-blue-600 to-purple-600 px-2 py-3 text-white" /> */}
      <p className="text-2xl font-bold md:text-3xl mt-3 dark:text-foreground">
        <Suspense fallback={<NumbersLoading />}>
          {num}+
        </Suspense>
        
      </p>
      <p className="text-black/70 text-sm md:text-base dark:text-foreground">
        {desc}
      </p>
    </div>
  );
}
