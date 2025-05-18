"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePomodoro } from "../hooks/usePomodoro";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import ShowPomodoroList from "./show-pomodoro-list";
export function PomodoroTimer() {
  const {
    time,
    setTime,
    workTime,
    setWorkTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    isActive,
    timerState,
    setTimerState,
    pomodoroCount,
    startTimer,
    pauseTimer,
    resetTimer,
  } = usePomodoro();

  const [isEditingTime, setIsEditingTime] = useState(false);

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

  const editValueHandler = () => {
    setIsEditingTime(!isEditingTime);
    pauseTimer();
  };

  const handleEditTime = () => {
    setIsEditingTime(!isEditingTime);
    if (timerState === "longBreak") {
      setLongBreakTime(time);
    } else if (timerState === "shortBreak") {
      setShortBreakTime(time);
    } else {
      setWorkTime(time);
    }
    pauseTimer();
  };

  const switchTimerState = (
    state: "work" | "shortBreak" | "longBreak",
    duration: number,
  ) => {
    resetTimer();
    setTimerState(state);
    setTime(duration);
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader className="relative flex items-center h-16">
          <CardTitle className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
            {timerState === "work" && "Focus Time"}
            {timerState === "shortBreak" && "Short Break"}
            {timerState === "longBreak" && "Long Break"}
            {timerState === "idle" && "Pomodoro Timer"}
          </CardTitle>

          <div className="ml-auto">
            <ShowPomodoroList />
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-52 h-52 ">
              {!isEditingTime && (
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
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                {isEditingTime ? (
                  <div className="flex gap-2 items-center flex-col cursor-pointer">
                    <div className="flex gap-2 text-3xl font-medium select-none">
                      <Button
                        className="text-3xl"
                        onClick={() => {
                          const max = 3600;
                          setTime(Math.min(time + 60, max));
                        }}
                      >
                        <svg width="40" height="40" viewBox="0 0 15 15">
                          <path
                            d="M4 9H11L7.5 4.5L4 9Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </Button>

                      <div className="w-24 text-center">
                        {Math.floor(time / 60)
                          .toString()
                          .padStart(2, "0")}
                        :{(time % 60).toString().padStart(2, "0")}
                      </div>

                      <Button
                        className="text-3xl"
                        onClick={() => {
                          setTime(Math.max(time - 60, 60));
                        }}
                      >
                        <svg width="40" height="40" viewBox="0 0 15 15">
                          <path
                            d="M4 6H11L7.5 10.5L4 6Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </Button>
                    </div>

                    <Slider
                      value={[time]}
                      onValueChange={([val]) => setTime(val)}
                      max={3600}
                      min={60}
                      step={60}
                      className="w-48 h-10"
                    />
                  </div>
                ) : (
                  <div
                    onClick={editValueHandler}
                    className="text-5xl flex items-center justify-center font-bold cursor-pointer select-none"
                  >
                    {Math.floor(time / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(time % 60).toString().padStart(2, "0")}
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Completed Pomodoros: {pomodoroCount}
            </div>
            <div className="flex gap-2">
              {!isActive && (
                <Button
                  onClick={startTimer}
                  disabled={isEditingTime}
                  className="cursor-pointer"
                >
                  {timerState === "idle" ? "Start" : "Start"}
                </Button>
              )}
              {isActive && (
                <Button
                  onClick={pauseTimer}
                  disabled={isEditingTime}
                  variant="outline"
                  className="cursor-pointer"
                >
                  Pause
                </Button>
              )}
              <Button
                onClick={resetTimer}
                disabled={isEditingTime}
                variant="destructive"
                className="cursor-pointer"
              >
                Reset
              </Button>
              <Button
                onClick={handleEditTime}
                className="cursor-pointer"
                disabled={isActive}
              >
                {isEditingTime ? "Done" : "Edit"}
              </Button>
            </div>
            <div className="flex gap-2 mb-2">
              <Button
                variant={timerState === "work" ? "default" : "outline"}
                onClick={() => switchTimerState("work", workTime)}
                size="sm"
                disabled={isEditingTime}
                className="cursor-pointer"
              >
                Focus
              </Button>
              <Button
                variant={timerState === "shortBreak" ? "default" : "outline"}
                onClick={() => switchTimerState("shortBreak", shortBreakTime)}
                size="sm"
                disabled={isEditingTime}
                className="cursor-pointer"
              >
                Short Break
              </Button>
              <Button
                variant={timerState === "longBreak" ? "default" : "outline"}
                onClick={() => switchTimerState("longBreak", longBreakTime)}
                size="sm"
                disabled={isEditingTime}
              >
                Long Break
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
