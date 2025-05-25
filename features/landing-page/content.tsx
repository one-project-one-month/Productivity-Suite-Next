import { CheckSquare, NotebookPen, Timer, Wallet } from "lucide-react";
import ContentCard from "./content-card";

export default function Content() {
  return (
    <section className=" my-10 max-w-7xl mx-auto">
      <div className="text-center px-2">
        <h1 className="text-4xl font-bold">
          Everything You Nedd to Stay Productive
        </h1>
        <p className="mt-7 text-lg text-muted-foreground">
          Four powerful tools working together to streamline your workflow and
          boost your productivity.
        </p>
      </div>

      <div className="px-5 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <ContentCard
          link="/pomodoro-timer"
          icon={<Timer size={32} />}
          title="Pomodoro Timer"
          desc="Stay focused with customizable work sessions and break intervals. Track your productivity patterns and optimize your workflow."
          style="bg-red-400/5 [&_div]:bg-red-400 "
        />
        <ContentCard
          link="/to-do"
          icon={<CheckSquare size={32} />}
          title="Task Management"
          desc="Organize your projects with intuitive kanban boards, deadlines, and priority levels. Collaborate seamlessly with your team."
          style="bg-blue-400/5 [&_div]:bg-blue-400 "
        />
        <ContentCard
          link="/notes"
          icon={<NotebookPen size={32} />}
          title="Note Taking"
          desc="Capture ideas with rich text editing, markdown support, and powerful search. Link notes to tasks and projects effortlessly."
          style="bg-green-400/5 [&_div]:bg-green-400 "
        />
        <ContentCard
          link="/budget-tracker/overview"
          icon={<Wallet size={32} />}
          title="Budget Tracker"
          desc="Monitor your finances with expense tracking, budget goals, and insightful analytics. Keep your projects and personal finances on track."
          style="bg-purple-400/5 [&_div]:bg-purple-400 "
        />
      </div>
    </section>
  );
}
