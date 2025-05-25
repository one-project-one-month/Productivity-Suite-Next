import { ReactNode } from "react";
import { getUserSession } from "@/lib/server-util";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getUserSession();
  if (session) {
    redirect("/");
  }
  return (
    <main
      className={
        "w-dvw h-dvh md:w-screen md:h-screen max-sm:px-8 flex items-center justify-center bg-[#97a0ac]"
      }
    >
      {children}
    </main>
  );
};

export default AuthLayout;
