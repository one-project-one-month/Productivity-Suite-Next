import { Control } from "react-hook-form";
import { TCreateTodoSchema } from "@/database/validators";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/util/date-picker";
import PriorityPicker from "@/features/todos/components/priority-picker";

type TodoFormBodyProps = {
  control: Control<TCreateTodoSchema>;
};
const TodoFormBody = ({ control }: TodoFormBodyProps) => {
  return (
    <div className={"flex flex-col gap-y-4 md:gap-y-6"}>
      <FormField
        control={control}
        name={"title"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expense Title</FormLabel>
            <FormControl>
              <Input placeholder={"Eg: ExpenseCard Title"} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={"description"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Description</FormLabel>
            <FormControl>
              {/*//@ts-expect-error description can't be null since i give it a default empty string*/}
              <Textarea
                placeholder={"Eg: ExpenseCard Description"}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className={"grid md:grid-cols-2 gap-4"}>
        <FormField
          control={control}
          name={"dueAt"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date (Optional)</FormLabel>
              <FormControl>
                <DatePicker {...field} value={field.value!} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"priority"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <PriorityPicker {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TodoFormBody;
