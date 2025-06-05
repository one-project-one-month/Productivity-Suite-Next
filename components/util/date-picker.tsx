import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
};

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild className={"w-full"}>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[7777]" align="start">
        <Calendar
          mode="single"
          selected={value}
          /*@ts-expect-error valueOf onChange can't be undefined}*/
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
