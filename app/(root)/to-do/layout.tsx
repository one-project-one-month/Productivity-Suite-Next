import { ReactNode } from "react";

const TodoLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-4xl mx-auto mt-10">
      {children}
      {/* <Toaster position="top-right" richColors closeButton /> */}
    </main>
  );
};

export default TodoLayout;
