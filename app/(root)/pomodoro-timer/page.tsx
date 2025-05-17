import { PomodoroTimer } from "@/features/pomodoro-timer/components/pomodoro-timer";
import { getUserSession } from "@/lib/server-util";

export default async function PomodoroTimerPage() {
  const session = await getUserSession();
  const userId = session?.user.id || "";
  return (
    <section className="bg-background text-foreground max-w-7xl mx-auto flex items-center justify-center mt-6">
      <PomodoroTimer userId={userId} />
    </section>
  );
}
