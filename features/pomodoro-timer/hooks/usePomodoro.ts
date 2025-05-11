"use client";

import { useState, useEffect, useCallback } from "react";

type TimerState = "work" | "shortBreak" | "longBreak" | "idle";

interface UsePomodoroReturn {
  time: number;
  setTime: (time: number) => void;
  isActive: boolean;
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
  pomodoroCount: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const usePomodoro = (): UsePomodoroReturn => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [pomodoroCount, setPomodoroCount] = useState(0);

  // Add mounted check
  useEffect(() => {
    setMounted(true);
  }, []);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setTimerState("work");
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimerState("idle");
    setTime(25 * 60);
  }, []);

  const switchToBreak = useCallback(() => {
    const isLongBreak = pomodoroCount > 0 && (pomodoroCount + 1) % 4 === 0;
    setTimerState(isLongBreak ? "longBreak" : "shortBreak");
    setTime(isLongBreak ? 15 * 60 : 5 * 60);
  }, [pomodoroCount]);

  useEffect(() => {
    if (!mounted) return; // Only run timer effect when component is mounted

    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (timerState === "work") {
        setPomodoroCount((prev) => prev + 1);
        switchToBreak();
      } else {
        resetTimer();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, timerState, switchToBreak, resetTimer, mounted]);

  return {
    time,
    setTime,
    isActive,
    timerState,
    setTimerState,
    pomodoroCount,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
