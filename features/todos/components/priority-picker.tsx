import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TodoPriority } from "@/database/enums";

type PriorityPickerProps = {
  value: string;
  onChange: (value: string) => void;
};
const PriorityPicker = ({ value, onChange }: PriorityPickerProps) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={"LOW"}>
      <SelectTrigger className={"w-full capitalize"}>
        <SelectValue placeholder="Select Priority" className={"!capitalize"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priorities</SelectLabel>
          {TodoPriority.enumValues.map((item, idx) => (
            <SelectItem value={item} className={"!capitalize"} key={idx}>
              {item.toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PriorityPicker;
