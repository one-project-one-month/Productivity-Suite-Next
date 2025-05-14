import { Ellipsis } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type SummaryCardProps = {
  title: string;
  data: string;
  description: string;
};
const SummaryCard = ({ title, data, description }: SummaryCardProps) => {
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-semibold"}>{title}</h2>
      <p className={"my-2 text-3xl font-bold"}>{data}</p>
      <p className={"text-sm font-semibold text-gray-400"}>{description}</p>
    </div>
  );
};
SummaryCard.Skeleton = function SummaryCardSkeleton({
  title,
}: {
  title: string;
}) {
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-semibold"}>{title}</h2>
      <p className={"my-2 text-3xl font-bold"}>
        <Ellipsis className={"animate-pulse"} />
      </p>
      <Skeleton className={"w-full h-6"} />
    </div>
  );
};
export default SummaryCard;
