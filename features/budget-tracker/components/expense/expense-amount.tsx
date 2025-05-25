import { Input } from "@/components/ui/input";

type ExpenseAmountProps = {
  value: number;
  onChange: (value: number) => void;
};
const ExpenseAmount = ({ value, onChange }: ExpenseAmountProps) => {
  return (
    <div className={"flex justify-center items-baseline gap-x-4"}>
      <Input
        placeholder={"0.00"}
        value={value}
        type={"number"}
        onChange={(evt) => onChange(Number.parseInt(evt.target.value))}
      />
      <Input disabled={true} value={"MMK"} className={"w-[80px]"} />
    </div>
  );
};

export default ExpenseAmount;
