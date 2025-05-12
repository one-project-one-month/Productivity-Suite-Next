"use client";

import { useState, useEffect, useCallback } from "react";

type TimerState = "work" | "shortBreak" | "longBreak" | "idle";

  interface UsePomodoroReturn {
      time: number;
      setTime:(time: number) => void;
      workTime: number;
      setWorkTime:(time: number) => void;
      shortBreakTime: number;
      setShortBreakTime:(time: number) => void;
      longBreakTime: number;
      setLongBreakTime:(time: number) => void;
      isActive: boolean;
      timerState: TimerState;
      setTimerState: (state: TimerState) => void;
      pomodoroCount: number;
      startTimer: () => void;
      pauseTimer: () => void;
      resetTimer: () => void;
    }


  export const usePomodoro = () : UsePomodoroReturn => {
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

  const startTimer = useCallback(() => {
    setIsActive(true);
    if(timerState==="shortBreak"){
      setTimerState("shortBreak");
    }else if(timerState==="longBreak"){
      setTimerState("longBreak");
    }else{
      setTimerState("work");
    }
  }, [timerState]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimerState("idle");
  }, []);
  

  const switchToBreak = useCallback(() => {
    const isLongBreak = pomodoroCount > 0 && (pomodoroCount + 1) % 4 === 0;
    setTimerState(isLongBreak ? "longBreak" : "shortBreak");
    setTime(isLongBreak ? longBreakTime : shortBreakTime);
  }, [pomodoroCount,longBreakTime,shortBreakTime]);

  useEffect(() => {
  if (!mounted) return;

  let interval: NodeJS.Timeout;

  if (isActive && time > 0) {
    interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  } else if (time === 0) {
    if (timerState === "work") {
      setWorkCompleted(true); // Mark that a work session finished
      switchToBreak();
    } else if (timerState === "shortBreak") {
      if (workCompleted) {
        setPomodoroCount((prev) => prev + 1);
        setWorkCompleted(false); // Reset after counting
      }
      resetTimer();
    } else {
      resetTimer(); // for long break or other states
    }
  }

  return () => clearInterval(interval);
}, [isActive, time, timerState, switchToBreak, resetTimer, mounted, workCompleted]);

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