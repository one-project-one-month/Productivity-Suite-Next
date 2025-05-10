import { ReactNode } from "react";

const TodoLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main
            className="max-w-3xl mx-auto mt-10">
            {children}
        </main>
    );
};

export default TodoLayout;
