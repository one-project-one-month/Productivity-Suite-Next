"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimerState, usePomodoro } from "../hooks/usePomodoro";
import ShowPomodoroList from "./show-pomodoro-list";
import { useEffect, useState } from "react";
import { useSelectedId } from "../hooks/use-selected-id";
import { useGetSequenceByTimerId } from "../hooks/use-get-sequence-by-timer-id";
import { CheckCircleIcon, CircleSmall, Forward } from "lucide-react";
import { useUpdateTimer } from "../hooks/use-update-timer";
import { useResetTimer } from "../hooks/use-reset";
import { parsePriority } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import Confetti from "react-confetti";
import { useBeforeUnload } from "@/hooks/use-before-unload";

interface PomodoroCardInterface {
  id: string;
  category: string;
  description: string;
}

interface PomodoroProps {
  userId: string;
}

export type TLocalPomodoroState = {
  currentTime: number;
  currentType: TimerState;
  durations: {
    work: number;
    break: number;
  };
  count: number;
};

export function PomodoroTimer({ userId }: PomodoroProps) {
  const [currentPomodoro, setCurrentPomodoro] =
    useState<PomodoroCardInterface | null>(null);
  const [localState, setLocalState] = useState<TLocalPomodoroState>({
    currentTime: 25 * 60,
    currentType: "idle",
    durations: {
      work: 25 * 60,
      break: 15 * 60,
    },
    count: 0,
  });
  const { selectedId, setSelectedId } = useSelectedId();
  const { data, isSuccess } = useGetSequenceByTimerId(selectedId);
  const [seqIdx, setSeqIdx] = useState<number>(0);
  const currentTimer = data?.[seqIdx]?.timer;

  const activeTimer = data
    ? data.findIndex((item) => item.timer.remaining !== 0)
    : 0;

  // #region UsePomodoro
  const {
    time,
    setTime,
    workTime,
    setWorkTime,
    breakTime,
    setBreakTime,
    // shortBreakTime,
    // setShortBreakTime,
    // longBreakTime,
    isActive,
    // setIsActive,
    timerState,
    setTimerState,
    startTimer,
    pauseTimer,
    resetTimer,
  } = usePomodoro({
    Ptime: currentTimer?.remaining ?? 25 * 60,
    PworkTime: currentTimer?.duration ?? 25 * 60,
    PbreakTime: data?.[seqIdx + 1]?.timer.duration ?? 15 * 60,
    // PshortBreakTime: 5 * 60,
    // PlongBreakTime: 15 * 60,
    PisActive: false,
    PtimerState: "idle",
    PpomodoroCount: 0,
    PworkCompleted: false,
    currentTimerId: currentTimer?.id,
  });

  const { mutateAsync: updateTimer } = useUpdateTimer();
  const { mutateAsync: resetDbTimer, isPending: isResetting } = useResetTimer();
  const queryClient = useQueryClient();
  const allPomodorosFinished =
    isSuccess &&
    data &&
    data
      .filter((item) => item.timer.type === "FOCUS")
      .every((item) => item.timer.remaining === 0);

  useBeforeUnload(isActive);

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

    const localState = localStorage.getItem("pomodoro-state");
    if (currentTimer && localState) {
      setLocalState({
        currentTime: currentTimer?.remaining,
        currentType: currentTimer?.type === "FOCUS" ? "work" : "break",
        durations: {
          work: currentTimer?.duration || 25 * 60,
          break: data?.[seqIdx + 1]?.timer.duration || 15 * 60,
        },
        count: 0,
      });
    }
  }, [setSelectedId, currentTimer, data, seqIdx]);

  useEffect(() => {
    if (typeof window != "undefined") {
      if (currentTimer) {
        const workTimer = currentTimer.remaining;
        setWorkTime(workTimer);
        setBreakTime(data[seqIdx + 1]?.timer.duration || 15 * 60);
        setTime(currentTimer.remaining || workTimer);
      }
    }
  }, [
    setTime,
    setWorkTime,
    isSuccess,
    currentTimer,
    seqIdx,
    data,
    setTimerState,
    breakTime,
    setBreakTime,
  ]);

  const getMaxTime = () => {
    switch (timerState) {
      case "work":
        return currentTimer?.duration || workTime;
      case "break":
        return currentTimer?.duration || breakTime;
      default:
        return currentTimer?.duration || 25 * 60;
    }
  };

  const calculateProgress = () => {
    const maxTime = getMaxTime();
    const currentTime = time;
    return ((maxTime - currentTime) / maxTime) * 100;
  };

  // #region Pause
  async function handlePause() {
    pauseTimer();
    if (currentTimer) {
      await updateTimer({ timerId: currentTimer.id, remaining: time });
    }
  }

  async function handleDotClick(idx: number) {
    setSeqIdx(idx * 2);
    if (data) {
      setTime(data[idx].timer.remaining);
    }
    queryClient.invalidateQueries({
      queryKey: ["timerSequence", selectedId],
    });
  }

  async function StartTimer() {
    startTimer();
    if (currentTimer) {
      await updateTimer({ timerId: currentTimer.id, remaining: time });
    }
  }

  // #region Reset
  async function ResetTimer() {
    resetTimer();
    if (data && data.length > 0) {
      for (const item of data) {
        await resetDbTimer({
          timerId: item.timer.id,
          remaining: item.timer.duration,
        });
      }
      setSeqIdx(0);
      setWorkTime(data[0].timer.duration);
      setBreakTime(data[1]?.timer.duration);
      setTime(data[0].timer.duration);
      setTimerState("idle");
    }
    queryClient.invalidateQueries({
      queryKey: ["timerSequence", selectedId],
    });
  }

  // #region Auto Update
  useEffect(() => {
    if (!isActive || time > 0) return;
    (async () => {
      if (!data || !data[seqIdx]) return;
      await updateTimer({ timerId: data[seqIdx].timer.id, remaining: 0 });
      setSeqIdx(seqIdx + 1);

      queryClient.invalidateQueries({
        queryKey: ["timerSequence", selectedId],
      });

      if (data[seqIdx + 1]) {
        setSeqIdx(seqIdx + 1);
        const next = data[seqIdx + 1].timer;
        if (next.type === "BREAK") {
          setTime(next.duration);
          setTimerState("break");
          startTimer();
        } else {
          setTime(next.duration);
          setTimerState("idle");
          setWorkTime(next.duration);
          pauseTimer();
        }
      }

      if (data[seqIdx + 1]) {
        setTime(data[seqIdx + 1].timer.duration);
      } else {
        setTime(0);
        pauseTimer();
      }
    })();
  }, [
    isActive,
    time,
    data,
    seqIdx,
    queryClient,
    updateTimer,
    selectedId,
    pauseTimer,
    startTimer,
    setTime,
    setTimerState,
    setWorkTime,
    setBreakTime,
  ]);

  // #region Return
  return (
    <>
      <Card className="w-[350px] relative">
        <CardHeader className="relative flex items-center h-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <CardTitle className="text-xl font-bold w-full text-nowrap">
              {timerState === "work" && "Focus Time"}
              {timerState === "break" && "Break Time"}
              {timerState === "idle" && "Pomodoro Timer"}
              {isSuccess && data[seqIdx]?.sequence.priority && (
                <span
                  className={`text-xs font-light ml-1 ${parsePriority(data[seqIdx]?.sequence.priority)} rounded-md px-2`}
                >
                  {parsePriority(data[seqIdx].sequence.priority, false)}
                </span>
              )}
            </CardTitle>
            {currentPomodoro && (
              <div className="text-sm text-muted-foreground mt-1 max-w-80 text-nowrap overflow-hidden text-ellipsis mx-auto text-center">
                {currentPomodoro.description}
              </div>
            )}
          </div>
          <div className="ml-auto self-start">
            <ShowPomodoroList userId={userId} localState={localState} />
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-52">
              <svg className="size-52 -rotate-90">
                <circle
                  cx={104}
                  cy={104}
                  r={94}
                  className="stroke-muted stroke-[8px] fill-none"
                />
                <circle
                  cx={104}
                  cy={104}
                  r={94}
                  className="stroke-primary stroke-[8px] fill-none"
                  strokeLinecap="round"
                  strokeDasharray={590}
                  strokeDashoffset={590 - (590 * calculateProgress()) / 100}
                  style={
                    isActive || !allPomodorosFinished
                      ? { transition: "stroke-dashoffset 200ms linear" }
                      : { transition: "none" }
                  }
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
                  {(data && data[seqIdx]?.timer?.remaining == 0) ||
                  allPomodorosFinished ? (
                    "Completed"
                  ) : timerState == "idle" ? (
                    <span className="opacity-50">...</span>
                  ) : isActive ? (
                    <span className="text-green-500">Running</span>
                  ) : (
                    <span className="text-destructive">Paused</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex justify-between w-full">
              <p className="flex items-center gap-0.5">
                <CheckCircleIcon className="inline size-4" />
                {isSuccess
                  ? data.filter(
                      (item) =>
                        item.timer.type === "FOCUS" &&
                        item.timer.remaining === 0,
                    ).length
                  : 0}
                /
                {isSuccess
                  ? data.filter((item) => item.timer.type === "FOCUS").length
                  : 1}{" "}
                completed
              </p>
              <p className="flex items-center gap-0.5 lowercase relative">
                <span className="peer">
                  {isSuccess
                    ? data[seqIdx + 1] &&
                      data[seqIdx + 1].timer.duration / 60 +
                        "-min " +
                        data[seqIdx + 1]?.timer.type
                    : breakTime / 60 + "-min break"}
                </span>
                <span className="peer-empty:hidden absolute -left-4">
                  <Forward className="inline size-4" />
                </span>
              </p>
            </div>

            <div className="flex *:size-4 *:cursor-pointer *:hover:scale-110 ">
              {data
                ?.filter((item) => item.timer.type == "FOCUS")
                .map((item, index) => (
                  <CircleSmall
                    key={item.timer.id}
                    className={`${Math.floor(seqIdx / 2) === index ? "fill-foreground" : ""}`}
                    onClick={async () => {
                      await handleDotClick(index);
                    }}
                  />
                ))}
            </div>

            <div className="flex gap-2">
              {!isActive && (
                <Button
                  onClick={async () => {
                    await StartTimer();
                  }}
                  className="min-w-24"
                  disabled={activeTimer !== seqIdx}
                >
                  {timerState === "idle" ? "Start" : "Resume"}
                </Button>
              )}
              {isActive && (
                <Button
                  onClick={async () => {
                    await handlePause();
                  }}
                  variant="outline"
                  className="min-w-24"
                >
                  Pause
                </Button>
              )}
              <Button
                onClick={async () => {
                  await ResetTimer();
                }}
                variant="destructive"
                className="disabled:cursor-wait pointer-events-auto!"
                disabled={isResetting}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>

        <div className="absolute inset-0 pointer-events-none">
          {allPomodorosFinished && (
            <Confetti
              width={350}
              height={441}
              recycle={false}
              numberOfPieces={200}
              gravity={0.5}
            />
          )}
        </div>
      </Card>
    </>
  );
}
