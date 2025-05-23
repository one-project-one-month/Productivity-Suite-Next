import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyType } from "@/database/enums";

type CurrencyPickerProps = {
  value: string;
  onChange: (value: string) => void;
};
const CurrencyPicker = ({ value, onChange }: CurrencyPickerProps) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={"USD"}>
      <SelectTrigger className={"w-full capitalize"}>
        <SelectValue placeholder="Select Categroy" className={"capitalize"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Currency</SelectLabel>
          {CurrencyType.enumValues.map((currency) => (
            <SelectItem
              value={currency}
              key={currency}
              className={"capitalize"}
            >
              {currency}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrencyPicker;
