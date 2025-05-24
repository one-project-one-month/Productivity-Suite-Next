import { ReactNode } from "react";
import Nav from "@/components/nav";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
};

export default RootLayout;
