"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormSchema, SignInSchema } from "@/database/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordField from "@/features/auth/components/password-field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignInForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignInSchema> = async (values) => {
    await authClient.signIn.email(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast.success("Sign In successfully");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error("Sign In Failed", {
            description: ctx.error.message,
            classNames: {
              description: "text-foreground",
            },
          });
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
          className={"mt-2 w-full"}
          type={"submit"}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className={"mr-2 inline-block animate-spin"} />
              <span>Signing In..</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
