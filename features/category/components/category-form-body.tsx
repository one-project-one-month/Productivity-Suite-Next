import { Control } from "react-hook-form";
import { TCategorySchema } from "@/database/validators";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { COLOR_PALLET } from "@/constants";
import { Check } from "lucide-react";

type CategoryFormBodyProps = {
  control: Control<TCategorySchema>;
};
const CategoryFormBody = ({ control }: CategoryFormBodyProps) => {
  return (
    <div className={"flex flex-col gap-y-4"}>
      <FormField
        control={control}
        name={"name"}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"font-semibold"}>Category Name:</FormLabel>
            <FormControl>
              <Input
                placeholder={"Eg: Category name"}
                {...field}
                className={"!py-6 block"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={"color"}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"font-semibold"}>Accent Color:</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className={"flex items-center flex-wrap gap-4"}
              >
                {COLOR_PALLET.map((item, idx) => (
                  <FormItem key={item + idx}>
                    <FormLabel>
                      <span className={"sr-only"}>Color {item}</span>
                      <span
                        className={
                          "flex justify-center items-center aspect-square h-12 rounded-full"
                        }
                        role={"presentation"}
                        style={{
                          background: item,
                        }}
                      >
                        {field.value === item && (
                          <Check className={"text-white"} />
                        )}
                      </span>
                    </FormLabel>
                    <FormControl className={"hidden"}>
                      <RadioGroupItem value={item} />
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoryFormBody;
