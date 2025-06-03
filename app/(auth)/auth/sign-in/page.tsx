import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import SignInForm from "@/features/auth/components/sign-in-form";

const SignInPage = async () => {
  return (
    <section
      className={
        "w-full max-w-[520px] p-6  shadow-md rounded-lg bg-card text-muted-foreground"
      }
    >
      <h1 className={"mb-2 text-lg font-bold"}>Sign In </h1>
      <p className={"text-base  font-semibold"}>
        Sign In into your account to Lock-in and keep grinding
      </p>
      <SignInForm />
      <div className="mt-4 text-center text-sm">
        <span>Don&apos;t Have an account? </span>
        <Link href="/auth/sign-up" className="ml-2 underline font-bold">
          Sign Up
        </Link>
      </div>

      <Button
        asChild={true}
        variant={"outline"}
        className={"my-3 mx-auto block w-fit"}
      >
        <Link href={"/"} className={"flex"}>
          <House />
          <span>Go Back To Home</span>
        </Link>
      </Button>
    </section>
  );
};

export default SignInPage;
