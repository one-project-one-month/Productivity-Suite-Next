import { Dot } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex w-full h-dvh bg-background items-center justify-center">
      Loading
      <Dot className="animate-bounce text-foreground -ml-2" />
    </section>
  );
}
