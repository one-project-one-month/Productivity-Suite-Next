import { parsePriority } from "@/lib/utils";
import DeletePomodoro from "./delete-pormodoro";
// import { Button } from "@/components/ui/button";

interface PomodoroCardProps {
  id: string;
  category: string;
  description: string;
  priority: number | null;
  // onDelete: (id: string) => void;
}

const PomodoroCard = ({
  id,
  category,
  description,
  priority,
  // onDelete,
}: PomodoroCardProps) => {
  return (
    <div className="border  rounded-lg p-4 mb-2 text-muted-foreground transition-all duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* <span className="text-sm text-gray-400">#{id}</span> */}
          <div>
            <p className="line-clamp-2 text-foreground">{category}</p>
            <p className="text-sm">{description}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className={`${parsePriority(priority!)} priority`}>
              {parsePriority(priority!, false)}
            </div>
            {/* <Button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="p-1 hover:bg-destructive/10 rounded-full transition-colors cursor-pointer"
              asChild
            > */}
            <DeletePomodoro id={id} />
            {/* <Trash size={18} className="text-destructive"/> */}
            {/* </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroCard;
