import { ReactNode } from "react";
import Nav from "@/components/nav";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default RootLayout;
