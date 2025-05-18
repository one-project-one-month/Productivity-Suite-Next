"use client";

import { useState, useEffect, useCallback } from "react";

type TimerState = "work" | "shortBreak" | "longBreak" | "idle";

interface UsePomodoroReturn {
  time: number;
  setTime: (time: number) => void;
  workTime: number;
  setWorkTime: (time: number) => void;
  shortBreakTime: number;
  setShortBreakTime: (time: number) => void;
  longBreakTime: number;
  setLongBreakTime: (time: number) => void;
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
  const [time, setTime] = useState<number>(25 * 60);
  const [workTime, setWorkTime] = useState<number>(25 * 60);
  const [shortBreakTime, setShortBreakTime] = useState<number>(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState<number>(15 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [workCompleted, setWorkCompleted] = useState(false);

  // Add mounted check
  useEffect(() => {
    setMounted(true);
  }, []);

  const saveTimerState = useCallback(() => {
    setTime((prevTime) => {
      localStorage.setItem(
        "pomodoro-state",
        JSON.stringify({
          currentTime: prevTime,
          currentType: timerState,
          durations: {
            work: workTime,
            shortBreak: shortBreakTime,
            longBreak: longBreakTime,
          },
          count: pomodoroCount,
        }),
      );
      return prevTime;
    });
  }, [timerState, workTime, shortBreakTime, longBreakTime, pomodoroCount]);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem("pomodoro-state");
    if (savedState) {
      const state = JSON.parse(savedState);
      setTime(state.currentTime);
      setTimerState(state.currentType);
      setWorkTime(state.durations.work);
      setShortBreakTime(state.durations.shortBreak);
      setLongBreakTime(state.durations.longBreak);
      setPomodoroCount(state.count);
    }
  }, []);

  // Save state every 5 seconds when active
  useEffect(() => {
    if (!mounted || !isActive) return;

    const interval = setInterval(() => {
      saveTimerState();
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, [mounted, isActive, saveTimerState]);

  // timer functions to save state
  const startTimer = useCallback(() => {
    setIsActive(true);
    if (timerState === "idle") {
      setTimerState("work");
      setTime(workTime);
    }
    saveTimerState();
  }, [timerState, workTime, saveTimerState]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
    saveTimerState();
  }, [saveTimerState]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    switch (timerState) {
      case "work":
        setTime(workTime);
        break;
      case "shortBreak":
        setTime(shortBreakTime);
        break;
      case "longBreak":
        setTime(longBreakTime);
        break;
      default:
        setTime(workTime);
    }
    saveTimerState();
    localStorage.removeItem("pomodoro-state");
  }, [timerState, workTime, shortBreakTime, longBreakTime, saveTimerState]);

  //switch to break every work is done and make it long break every 4
  const switchToBreak = useCallback(() => {
    const isLongBreak = pomodoroCount > 0 && (pomodoroCount + 1) % 4 === 0;
    const newState = isLongBreak ? "longBreak" : "shortBreak";
    const newTime = isLongBreak ? longBreakTime : shortBreakTime;

    setTimerState(newState);
    setTime(newTime);
    setIsActive(true); // Automatically start break timer
  }, [pomodoroCount, longBreakTime, shortBreakTime]);

  useEffect(() => {
    if (!mounted) return;

    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      if (timerState === "work") {
        setWorkCompleted(true);
        switchToBreak();
      } else if (timerState === "shortBreak" || timerState === "longBreak") {
        if (workCompleted) {
          setPomodoroCount((prev) => prev + 1);
          setWorkCompleted(false);
        }
        setTimerState("work");
        setTime(workTime);
        setIsActive(false);
      }
    }

    return () => clearInterval(interval);
  }, [
    isActive,
    time,
    timerState,
    switchToBreak,
    workTime,
    mounted,
    workCompleted,
  ]);

  return {
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
  };
};
