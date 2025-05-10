import { PomodoroTimer } from "@/features/pomodoro-timer/components/pomodoro-timer";

export default function PomodoroTimerPage() {
  return (
    <section className="bg-background text-foreground max-w-7xl mx-auto flex items-center justify-center mt-20">
      <PomodoroTimer />
    </section>
  );
}
