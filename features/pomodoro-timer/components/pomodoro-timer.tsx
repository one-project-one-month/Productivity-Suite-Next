"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePomodoro } from "../hooks/usePomodoro";
import ShowPomodoroList from "./show-pomodoro-list";
import { useEffect, useState } from "react";

interface PomodoroCardInterface {
  id: number;
  category: string;
  description: string;
}

interface PomodoroProps {
  userId: string;
}

export function PomodoroTimer({ userId }: PomodoroProps) {
  const [currentPomodoro, setCurrentPomodoro] = useState<{
    description: string;
  } | null>(null);

  const {
    time,
    workTime,
    shortBreakTime,
    longBreakTime,
    isActive,
    timerState,
    pomodoroCount,
    startTimer,
    pauseTimer,
    resetTimer,
  } = usePomodoro();

  useEffect(() => {
    const savedId = localStorage.getItem("selectedPomodoroId");
    const storedSequences = localStorage.getItem("pomodoroSequences");

    if (savedId && storedSequences) {
      const sequences: PomodoroCardInterface[] = JSON.parse(storedSequences);
      const selected = sequences.find((s) => s.id.toString() === savedId);
      if (selected) {
        setCurrentPomodoro(selected);
      }
    }
  }, []);

  const getMaxTime = () => {
    switch (timerState) {
      case "work":
        return workTime;
      case "shortBreak":
        return shortBreakTime;
      case "longBreak":
        return longBreakTime;
      default:
        return 25 * 60;
    }
  };

  const calculateProgress = () => {
    const maxTime = getMaxTime();
    const currentTime = time;
    return ((maxTime - currentTime) / maxTime) * 100;
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader className="relative flex items-center h-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <CardTitle className="text-xl font-bold">
              {timerState === "work" && "Focus Time"}
              {timerState === "shortBreak" && "Short Break"}
              {timerState === "longBreak" && "Long Break"}
              {timerState === "idle" && "Pomodoro Timer"}
            </CardTitle>
            {currentPomodoro && (
              <div className="text-sm text-muted-foreground mt-1">
                Current - {currentPomodoro.description}
              </div>
            )}
          </div>
          <div className="ml-auto">
            <ShowPomodoroList userId={userId} />
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-52 h-52 ">
              <svg className="w-52 h-52 -rotate-90">
                <circle
                  cx="104"
                  cy="104"
                  r="94"
                  className="stroke-muted stroke-[8px] fill-none"
                />
                <circle
                  cx="104"
                  cy="104"
                  r="94"
                  className="stroke-primary stroke-[8px] fill-none"
                  strokeLinecap="round"
                  strokeDasharray={590}
                  strokeDashoffset={590 - (590 * calculateProgress()) / 100}
                  style={{
                    transition: "stroke-dashoffset 1s linear",
                  }}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <div className="text-5xl flex items-center justify-center font-bold select-none">
                  {Math.floor(time / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(time % 60).toString().padStart(2, "0")}
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Completed Pomodoros: {pomodoroCount}
            </div>
            <div className="flex gap-2">
              {!isActive && (
                <Button onClick={startTimer} className="cursor-pointer">
                  {timerState === "idle" ? "Start" : "Start"}
                </Button>
              )}
              {isActive && (
                <Button
                  onClick={pauseTimer}
                  variant="outline"
                  className="cursor-pointer"
                >
                  Pause
                </Button>
              )}
              <Button
                onClick={resetTimer}
                variant="destructive"
                className="cursor-pointer"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
