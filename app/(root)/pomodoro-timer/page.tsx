import { PomodoroTimer } from "@/features/pomodoro-timer/components/pomodoro-timer";
import { getUserSession } from "@/lib/server-util";
import { redirect } from "next/navigation";

export default async function PomodoroTimerPage() {
  const session = await getUserSession();
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <section className="bg-background text-foreground max-w-7xl mx-auto flex items-center justify-center mt-6">
      <PomodoroTimer userId={session.user.id} />
    </section>
  );
}
