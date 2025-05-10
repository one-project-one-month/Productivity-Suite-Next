"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePomodoro } from "../hooks/usePomodoro";
import { useState } from "react";

import AddNewPomodoro from "./add-new-pomodoro";
import ViewTimer from "./view-time";
export function PomodoroTimer() {
  const {
    time,
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
        return 25 * 60;
      case "shortBreak":
        return 5 * 60;
      case "longBreak":
        return 15 * 60;
      default:
        return 25 * 60;
    }
  };

  const calculateProgress = () => {
    const maxTime = getMaxTime();
    return ((maxTime - time) / maxTime) * 100;
  };

  const handleEditTime = () => {
    setIsEditingTime(!isEditingTime);
    pauseTimer();
  };


  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <AddNewPomodoro/>
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
             {
              <ViewTimer isEditingTime={isEditingTime} setIsEditingTime={setIsEditingTime}/>
             }
            </div>
            <div className="text-sm text-muted-foreground">
              Completed Pomodoros: {pomodoroCount}
            </div>
            <div className="flex gap-2">
              {!isActive && (
                <Button onClick={startTimer} disabled={isEditingTime}>
                  {timerState === "idle" ? "Start" : "Resume"}
                </Button>
              )}
              {isActive && (
                <Button
                  onClick={pauseTimer}
                  disabled={isEditingTime}
                  variant="outline"
                >
                  Pause
                </Button>
              )}
              <Button
                onClick={resetTimer}
                disabled={isEditingTime}
                variant="destructive"
              >
                Reset
              </Button>
              <Button onClick={handleEditTime}>
                {isEditingTime ? "Done" : "Edit"}
              </Button>
            </div>
            <div className="flex gap-2 mb-2">
              <Button
                variant={timerState === "work" ? "default" : "outline"}
                onClick={() => {
                  resetTimer();
                  setTimerState("work");
                }}
                size="sm"
              >
                Focus
              </Button>
              <Button
                variant={timerState === "shortBreak" ? "default" : "outline"}
                onClick={() => {
                  resetTimer();
                  setTimerState("shortBreak");
                }}
                size="sm"
              >
                Short Break
              </Button>
              <Button
                variant={timerState === "longBreak" ? "default" : "outline"}
                onClick={() => {
                  resetTimer();
                  setTimerState("longBreak");
                }}
                size="sm"
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
