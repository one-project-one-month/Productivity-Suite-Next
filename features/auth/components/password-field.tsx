"use client";
import { ChangeEventHandler, useState } from "react";

type PasswordFieldProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  className?: string;
};

const PasswordField = ({ onChange, value }: PasswordFieldProps) => {
  const [isPasswordField, setIsPasswordField] = useState(true);
  const onFieldTypeChange = () => {
    setIsPasswordField((prev) => !prev);
  };

  return (
    <div className="relative ">
      <input
        value={value}
        onChange={onChange}
        placeholder={"Eg: SUpeR@1232"}
        type={isPasswordField ? "password" : "text"}
        className={
          "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        }
      />

      <button
        className="absolute right-3 top-3 text-sm text-muted-foreground"
        type={"button"}
        onClick={onFieldTypeChange}
      >
        {isPasswordField ? "Show" : "Hide"}
      </button>
    </div>
  );
};

export default PasswordField;
