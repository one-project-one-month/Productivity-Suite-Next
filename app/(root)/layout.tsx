import { ReactNode } from "react";
import Nav from "@/components/nav";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default RootLayout;
