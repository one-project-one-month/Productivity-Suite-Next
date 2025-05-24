"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePomodoro } from "../hooks/usePomodoro";
import ShowPomodoroList from "./show-pomodoro-list";
import { useEffect, useState } from "react";
import { useSelectedId } from "../hooks/use-selected-id";

interface PomodoroCardInterface {
  id: string;
  category: string;
  description: string;
}

interface PomodoroProps {
  userId: string;
}

export function PomodoroTimer({ userId }: PomodoroProps) {
  const [currentPomodoro, setCurrentPomodoro] =
    useState<PomodoroCardInterface | null>(null);
  const { selectedId, setSelectedId } = useSelectedId();
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
    if (typeof window != undefined) {
      const storedSequences = localStorage.getItem("pomodoroSequence");

      if (storedSequences) {
        const sequenceObj = JSON.parse(
          storedSequences,
        ) as PomodoroCardInterface;
        setCurrentPomodoro(sequenceObj);
        setSelectedId(sequenceObj.id);
      }
    }

    // if (storedSequences != "") {
    //   const sequences: PomodoroCardInterface[] = JSON.parse(storedSequences);
    //   const selected = sequences.find((s) => s.id.toString() === savedId);
    //   if (selected) {
    //     setCurrentPomodoro(selected);
    //   }
    // }
  }, [selectedId, setSelectedId]);

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
              <div className="text-sm text-muted-foreground mt-1 max-w-80 text-nowrap overflow-hidden text-ellipsis mx-auto text-center">
                {currentPomodoro.description}
              </div>
            )}
          </div>
          <div className="ml-auto self-start">
            <ShowPomodoroList userId={userId} />
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="relative size-52">
              <svg className="size-52 -rotate-90">
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
                <div
                  title={currentPomodoro?.category}
                  className="text-center text-muted-foreground max-w-28 text-ellipsis overflow-hidden text-nowrap mx-auto text-sm"
                >
                  {currentPomodoro?.category}
                </div>
                <div className="text-5xl my-5 flex items-center justify-center font-bold select-none">
                  {Math.floor(time / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(time % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-center font-medium text-sm">
                  {timerState == "idle" ? (
                    <span className="opacity-50">...</span>
                  ) : isActive ? (
                    <span className="text-green-500">Running</span>
                  ) : (
                    <span className="text-destructive">Paused</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Completed Pomodoros: {pomodoroCount}
            </div>
            <div className="flex gap-2">
              {!isActive && (
                <Button
                  onClick={startTimer}
                  className="cursor-pointer min-w-24"
                >
                  {timerState === "idle" ? "Start" : "Resume"}
                </Button>
              )}
              {isActive && (
                <Button
                  onClick={pauseTimer}
                  variant="outline"
                  className="cursor-pointer min-w-24"
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
