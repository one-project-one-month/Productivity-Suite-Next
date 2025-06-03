import { Button } from "@/components/ui/button";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { House } from "lucide-react";
import Link from "next/link";

const SignUpPage = async () => {
  return (
    <section
      className={
        "w-full max-w-[520px] p-6 bg-card shadow-md rounded-lg text-muted-foreground"
      }
    >
      <h1 className={"mb-2 text-lg font-bold"}>Sign Up New Account</h1>
      <p className={"text-base font-semibold"}>
        Sign up to use our awesome productivity suit and boast your
        productivity.
      </p>
      <SignUpForm />
      <div className="mt-4 text-center text-sm">
        <span>Already Have an account?</span>
        <Link href="/auth/sign-in" className="ml-2 underline font-bold">
          Sign In
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

export default SignUpPage;
