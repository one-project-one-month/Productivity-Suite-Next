"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePomodoro } from "../hooks/usePomodoro";
import { useState } from "react";

import AddNewPomodoro from "./add-new-pomodoro";
import { Slider } from "@/components/ui/slider";
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
    if (timerState === "shortBreak") {
      return ((maxTime - shortBreakTime) / maxTime) * 100;
    } else if (timerState === "longBreak") {
      return ((maxTime - longBreakTime) / maxTime) * 100;
    } else {
      return ((maxTime - workTime) / maxTime) * 100;
    }
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
    console.log(workTime);
    pauseTimer();
  };

  const switchTimerState = (
    state: "work" | "shortBreak" | "longBreak",
    duration: number,
  ) => {
    resetTimer();
    setTimerState(state);
    if (!isEditingTime) setTime(duration);
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <AddNewPomodoro />
          <CardTitle className="text-center text-2xl">
            {timerState === "work" && "Focus Time"}
            {timerState === "shortBreak" && "Short Break"}
            {timerState === "longBreak" && "Long Break"}
            {timerState === "idle" && "Pomodoro Timer"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div>
              <div>
                <div
                  style={{
                    height: `${calculateProgress()}%`,
                  }}
                ></div>
              </div>
              <div>
                {isEditingTime ? (
                  <div className="flex gap-2 items-center flex-col h-40 cursor-pointer relative">
                    <div className="flex gap-2 text-3xl font-medium mt-10 select-none z-10">
                      <Button
                        className="text-3xl"
                        onClick={() => {
                          const max = 3600;
                          if (isEditingTime) {
                            setTime(Math.min(time + 60, max));
                          }
                        }}
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 9H11L7.5 4.5L4 9Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </Button>

                      <div
                        onClick={editValueHandler}
                        className="w-20 text-center"
                      >
                        {Math.floor(time / 60)
                          .toString()
                          .padStart(2, "0")}
                        :{(time % 60).toString().padStart(2, "0")}
                      </div>
                      <Button
                        className="text-3xl"
                        onClick={() => {
                          const max = 3600;
                          if (isEditingTime) {
                            setTime(Math.min(time - 60, max));
                          }
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
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
                      step={60}
                      className="w-48 h-10 z-10"
                    />
                  </div>
                ) : (
                  <div
                    onClick={editValueHandler}
                    className="text-5xl flex items-center justify-center font-bold h-40 cursor-pointer select-none"
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
