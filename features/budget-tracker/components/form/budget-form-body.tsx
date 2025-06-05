import { Control } from "react-hook-form";
import { TNewBudgetSchema } from "@/database/validators";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import DurationPicker from "../util/duration-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/database/interfaces.types";
import CategoryPicker from "@/features/budget-tracker/components/category/category-picker";

type BudgetFormBodyProps = {
  control: Control<TNewBudgetSchema>;
  categories: Category[];
};
const BudgetFormBody = ({ control, categories }: BudgetFormBodyProps) => {
  return (
    <div className={"flex flex-col gap-y-5"}>
      <FormField
        control={control}
        name={"title"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder={"Eg: Budget Title"} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={"description"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              {/*//@ts-expect-error description can't be null since i give it a default empty string*/}
              <Textarea placeholder={"Eg: Budget Description"} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={"amount"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Amount</FormLabel>
            <FormControl>
              <Input
                placeholder={"0.00"}
                value={field.value}
                type={"number"}
                onChange={(evt) =>
                  field.onChange(Number.parseInt(evt.target.value))
                }
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={"categoryId"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Category</FormLabel>
            <FormControl>
              <CategoryPicker
                value={field.value}
                onChange={field.onChange}
                categories={categories}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div
        className={
          "flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:items-center md:justify-between"
        }
      >
        <FormField
          control={control}
          name={"durationFrom"}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DurationPicker {...field} value={field.value!} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"durationTo"}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <DurationPicker {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BudgetFormBody;
