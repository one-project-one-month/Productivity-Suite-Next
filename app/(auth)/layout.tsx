import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
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
