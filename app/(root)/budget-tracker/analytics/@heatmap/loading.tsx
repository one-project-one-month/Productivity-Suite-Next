import { Skeleton } from "@/components/ui/skeleton";
import { HEAT_MAP_COLORS } from "@/constants";
import { Ellipsis } from "lucide-react";

const HeatmapLoading = () => {
  return (
    <div
      className={
        "p-6  border rounded-xl shadow-md md:col-span-2 overflow-x-scroll bg-card text-card-foreground"
      }
    >
      <h2 className={"font-bold text-2xl"}>Activity Heatmap</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget activity tracking over this year.
      </p>
      <div
        className={"mb-5 text-gray-500 md:flex items-center justify-between"}
      >
        <p className={"flex items-center justify-between gap-x-2"}>
          <Ellipsis className={"animate-pulse"} />
          <span>actives days in this year</span>
        </p>
        <div className={"flex items-center gap-x-2"}>
          <span className={"mr-3"}>Less</span>
          {HEAT_MAP_COLORS.map((color) => (
            <span
              key={color}
              className={`aspect-square h-4 md:6`}
              style={{ backgroundColor: color }}
              role={"presentation"}
            />
          ))}
          <span className={"ml-3"}>more</span>
        </div>
      </div>
      <Skeleton className={"w-full h-[300px]"} />
    </div>
  );
};

export default HeatmapLoading;
