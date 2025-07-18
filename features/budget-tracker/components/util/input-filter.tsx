import { Search } from "lucide-react";

type ExpenseFilterProps = {
  onChange: (filter: string) => void;
  placeholder: string;
};
const InputFilter = ({ onChange, placeholder }: ExpenseFilterProps) => {
  return (
    <div
      className={
        "max-w-[240px] flex items-center gap-x-2 px-2 py-1 border  rounded-lg"
      }
    >
      <label htmlFor={"search"}>
        <Search className={"text-black/50 size-4 dark:text-white"} />
      </label>
      <input
        className={
          "focus:border-none focus:outline-none px-2 py-1 placeholder:text-gray-400"
        }
        id={"search"}
        onChange={(evt) => onChange(evt.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFilter;
