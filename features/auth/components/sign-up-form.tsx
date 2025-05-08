"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormSchema, SignUpSchema } from "@/database/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import PasswordField from "./password-field";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/client-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpSchema> = async (values) => {
    await authClient.signUp.email(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast.success("Sign up successfully");
          router.replace("/");
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.error("Sign up failed");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"py-6 flex flex-col gap-y-4"}
      >
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name:</FormLabel>
              <FormControl>
                <Input placeholder={"Eg: Super Mario"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={"Eg: super@gmail.com"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordField onChange={field.onChange} value={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className={"mt-4 w-full"}
          type={"submit"}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className={"mr-2 inline-block animate-spin"} />
              <span>Signing Up..</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
