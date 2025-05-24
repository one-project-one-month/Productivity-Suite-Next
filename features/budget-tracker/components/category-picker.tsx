import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/database/interfaces.types";

type CategorySelectProps = {
  value: string;
  onChange: (value: string) => void;
  categories: Category[];
};

const CategoryPicker = ({
  value,
  onChange,
  categories,
}: CategorySelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      defaultValue={categories[0].id}
    >
      <SelectTrigger className={"w-full capitalize"}>
        <SelectValue placeholder="Select Categroy" className={"capitalize"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem
              value={category.id}
              key={category.id}
              className={"capitalize"}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryPicker;
