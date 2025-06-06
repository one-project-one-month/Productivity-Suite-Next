import { Dot, GitFork, Github, Star } from "lucide-react";
import Link from "next/link";
import AnimateComponent from "./animate-component";
import { Suspense } from "react";

export default function HeroSection({
  stars,
  forks,
}: {
  stars: number;
  forks: number;
}) {
  return (
    <section className="py-10 font-roboto flex flex-col gap-10 overflow-hidden relative min-h-[calc(100dvh-60px)] justify-center">
      <div className="">
        <AnimateComponent delay={0.8}>
          <div className="flex gap-1 items-center text-sm border text-foreground/90 mx-auto border-blue-300 dark:border-blue-500/50 bg-background rounded-full w-max px-3 py-2 ">
            <Github size={16} />
            <p className="font-medium">Open Source & Community Driven</p>
          </div>
        </AnimateComponent>
      </div>

      <div className="text-center">
        <AnimateComponent>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 dark:from-blue-400 via-purple-500 to-blue-500 inline-block text-transparent bg-clip-text">
            FlowHub
          </h1>
        </AnimateComponent>
        <AnimateComponent delay={0.35}>
          <p className="text-2xl md:text-3xl font-medium mt-5 text-foreground/80">
            The Complete Productivity Suite
          </p>
        </AnimateComponent>
      </div>

      <div className="text-muted-foreground w-full max-w-3xl text-pretty mx-auto">
        <AnimateComponent delay={0.45}>
          <p className="text-xl text-center px-2">
            Built by the community, for the community. Transform your
            productivity with our integrated suite of tools: time tracking, task
            management, note-taking, and budget management - all in one place.
          </p>
        </AnimateComponent>
      </div>

      <AnimateComponent delay={0.65}>
        <div className="flex flex-col gap-6 justify-center items-center md:flex-row">
          <Link
            href="/pomodoro-timer"
            className="bg-gradient-to-r from-blue-600 to-purple-600 w-max shadow-sm shadow-black/30 px-6 py-2 rounded-md text-white font-bold transition-[colors,scale] duration-300 hover:scale-110 hover:saturate-[110%] cursor-pointer"
          >
            Get Started Free
          </Link>

          <Link
            href="https://github.com/one-project-one-month/Productivity-Suite-Next"
            target="_blank"
            className="border-2 border-muted-foreground/50 rounded-md px-7 py-2 font-medium cursor-pointer hover:border-blue-500 hover:bg-blue-500/5"
          >
            <Github className="inline mr-2 size-5 " /> View on GitHub
          </Link>
        </div>
      </AnimateComponent>

      <AnimateComponent delay={0.75}>
        <div className="flex gap-10 justify-center items-center text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Star className="inline text-yellow-500" size={16} /> 
            <Suspense fallback="...">
              {stars} 
            </Suspense>{" "}
            stars
          </div>
          <div className="flex items-center gap-0.5">
            <GitFork className="inline text-blue-500" size={16} /> 
            <Suspense fallback="...">
              {forks} 
            </Suspense>{" "}
             forks
          </div>
          <div className="flex items-center gap-0.5">
            <Dot className="inline scale-200 text-green-500" size={16} />
            Active development
          </div>
        </div>
      </AnimateComponent>

      <div className="absolute z-[-1] size-28 -top-10 -right-10 bg-blue-500 rounded-full blur-3xl" />
      <div className="absolute z-[-1] size-28 bottom-5 -left-20 bg-purple-500 rounded-full blur-3xl" />
    </section>
  );
}
