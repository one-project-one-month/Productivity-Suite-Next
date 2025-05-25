import { Button } from "@/components/ui/button";

type FilterStatusProps = {
  value: string;
  onChange: (value: string) => void;
};
const FilterStatus = ({ value, onChange }: FilterStatusProps) => {
  const statsUses = ["All", "PENDING", "COMPLETE", "OVERDUE"];
  const getColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500 text-white hover:bg-yellow-500";
      case "COMPLETE":
        return "bg-green-500 text-white hover:bg-green-500";
      case "OVERDUE":
        return "bg-red-500 text-white hover:bg-red-500";
      default:
        return "bg-gray-400 text-white hover:bg-gray-500";
    }
  };

  return (
    <section className="flex gap-2 text-lg">
      {statsUses.map((status) => {
        return (
          <Button
            size={"sm"}
            key={status}
            className={`${getColor(status)} ${
              value === status ? "ring-2 ring-offset-2 ring-blue-500" : ""
            }`}
            onClick={() => onChange(status)}
          >
            {status}
          </Button>
        );
      })}
    </section>
  );
};

export default FilterStatus;
