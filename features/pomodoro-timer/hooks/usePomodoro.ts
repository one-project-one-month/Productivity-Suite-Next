"use client";

import { useState, useEffect, useCallback } from "react";
// import { useGetSequenceByTimerId } from "./use-get-sequence-by-timer-id";
// import { useSelectedId } from "./use-selected-id";

export type TimerState = "work" | "break" | "idle";

interface UsePomodoroReturn {
  time: number;
  setTime: (time: number) => void;
  workTime: number;
  setWorkTime: (time: number) => void;
  breakTime: number;
  setBreakTime: (time: number) => void;
  // shortBreakTime: number;
  // setShortBreakTime: (time: number) => void;
  // longBreakTime: number;
  // setLongBreakTime: (time: number) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
  pomodoroCount: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

type PomodoroProps = {
  Ptime: number;
  PworkTime: number;
  PbreakTime: number;
  // PshortBreakTime: number;
  // PlongBreakTime: number;
  PisActive: boolean;
  PtimerState: TimerState;
  PpomodoroCount: number;
  PworkCompleted: boolean;
  currentTimerId?: string;
};

export const usePomodoro = ({
  Ptime,
  PworkTime,
  PbreakTime,
  PisActive,
  PtimerState,
  PpomodoroCount,
  PworkCompleted,
  currentTimerId,
}: PomodoroProps): UsePomodoroReturn => {
  // const { selectedId, setSelectedId } = useSelectedId();
  // const { data: timerSequence, isSuccess } = useGetSequenceByTimerId(selectedId);

  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<number>(Ptime);
  const [workTime, setWorkTime] = useState<number>(PworkTime);
  const [breakTime, setBreakTime] = useState<number>(PbreakTime);
  // const [shortBreakTime, setShortBreakTime] = useState<number>(PshortBreakTime);
  // const [longBreakTime, setLongBreakTime] = useState<number>(PlongBreakTime);
  const [isActive, setIsActive] = useState(PisActive);
  const [timerState, setTimerState] = useState<TimerState>(PtimerState);
  const [pomodoroCount, setPomodoroCount] = useState(PpomodoroCount);
  const [workCompleted, setWorkCompleted] = useState(PworkCompleted);

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
            work: PworkTime,
            break: PbreakTime,
            // shortBreak: shortBreakTime,
            // longBreak: longBreakTime,
          },
          count: pomodoroCount,
        }),
      );
      return prevTime;
    });
  }, [timerState, PbreakTime, pomodoroCount, PworkTime]);

  useEffect(() => {
    if (typeof window != "undefined") {
      const savedState = localStorage.getItem("pomodoro-state");
      if (savedState) {
        const state = JSON.parse(savedState);
        setTime(state.currentTime);
        setTimerState(state.currentType);
        setWorkTime(state.durations.work);
        setBreakTime(state.durations.break);
        // setShortBreakTime(state.durations.shortBreak);
        // setLongBreakTime(state.durations.longBreak);
        setPomodoroCount(state.count);
      }
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
    setTimerState("idle");
    setIsActive(false);
    switch (timerState) {
      case "work":
        setTime(workTime);
        break;
      case "break":
        setTime(breakTime);
        break;
      default:
        setTime(workTime);
    }
    saveTimerState();
    localStorage.removeItem("pomodoro-state");
  }, [saveTimerState, workTime, timerState, breakTime]);

  //switch to break every work is done and make it long break every 4
  const switchToBreak = useCallback(() => {
    // const isLongBreak = pomodoroCount > 0 && (pomodoroCount + 1) % 4 === 0;
    // const newState = isLongBreak ? "longBreak" : "shortBreak";
    // const newTime = isLongBreak ? longBreakTime : shortBreakTime;

    // setTimerState(newState);
    setTime(breakTime);
    setIsActive(true); // Automatically start break timer
  }, [breakTime]);

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
      } else if (timerState === "break") {
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
    currentTimerId,
  ]);

  return {
    time,
    setTime,
    workTime,
    setWorkTime,
    breakTime,
    setBreakTime,
    // shortBreakTime,
    // setShortBreakTime,
    // longBreakTime,
    // setLongBreakTime,
    isActive,
    setIsActive,
    timerState,
    setTimerState,
    pomodoroCount,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
