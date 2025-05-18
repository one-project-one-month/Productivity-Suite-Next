"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddWorkBreakSession from "./add-work-break-session";
import { getUserSession } from "@/lib/server-util";
import { useAddTimerSequence } from "../hooks/use-add-timer-sequence";

// Step now holds either work or break, not both
type Step = { type: "work" | "break"; duration: number | null };
interface PomodoroTask {
  category: string;
  description: string;
  durations: number[];
  breakTimes: number[];
  priority: 1 | 2 | 3 | 4 | 5;
}

const AddNewPomodoro = () => {
  const { mutateAsync } = useAddTimerSequence();

  const [task, setTask] = useState<PomodoroTask>({
    category: "",
    description: "",
    durations: [],
    breakTimes: [],
    priority: 2,
  });

  // Start with a work step
  const [steps, setSteps] = useState<Step[]>([{ type: "work", duration: 25 }]);

  // Add new step, alternating between work and break
  const addStep = () => {
    setSteps((prev) => {
      const lastStep = prev[prev.length - 1];
      const nextIndex = prev.length + 1;

      // If the last step is a work step, add a break and then a work step
      if (lastStep.type === "work") {
        //  if the next index is 8, then it will automatically generate
        //  15 min break as long break
        const breakDuration = nextIndex % 8 === 0 ? 15 : 5;
        return [
          ...prev,
          { type: "break", duration: breakDuration },
          { type: "work", duration: 25 },
        ];
      }

      // If the last step is a break, just add a work step
      return [...prev, { type: "work", duration: 25 }];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const session = await getUserSession();

    const durations = steps
      .filter((s) => s.type === "work" && s.duration !== null)
      .map((s) => s.duration!) as number[];

    const breakTimes = steps
      .filter((s) => s.type === "break" && s.duration !== null)
      .map((s) => s.duration!) as number[];

    setTask((prev) => ({
      ...prev,
      durations,
      breakTimes,
    }));

    const sequence = {
      user_id: session?.user.id,
      category: task.category,
      description: task.description,
      priority: task.priority,
      created: new Date().toISOString(),
    };

    const timerSequence = durations.flatMap((duration, index) => {
      const breakDuration = breakTimes[index] || 5;
      return [
        {
          step: index * 2 + 1,
          timer: {
            duration,
            remaining: duration,
            type: "work",
          },
        },
        {
          step: index * 2 + 2,
          timer: {
            duration: breakDuration,
            remaining: breakDuration,
            type: "break",
          },
        },
      ];
    });

    requestIdleCallback(() => {
      console.log("Sequence:", sequence);
      console.log("Timer Sequence:", timerSequence);
    });

    const payload = {
      userId: session?.user.id || "",
      category: task.category,
      description: task.description,
      priority: task.priority,
      createdAt: new Date(),
    };

    try {
      await mutateAsync(payload);

      // Reset steps to initial state
      setSteps([{ type: "work", duration: 25 }]);

      // Reset task form fields
      setTask({
        category: "",
        description: "",
        durations: [],
        breakTimes: [],
        priority: 2,
      });
    } catch (error) {
      console.error("Failed to add timer sequence:", error);
    }
  };

  return (
    <div className="w-full bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-between transition-all duration-200">
      <Dialog>
        <DialogTrigger className="w-full h-full bg-transparent text-lg outline-none text-primary/80 hover:text-primary cursor-pointer px-4 py-2 flex items-center gap-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          Add New Pomodoro
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[500px] h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Pomodoro</DialogTitle>
            <DialogDescription>
              Set your task details, durations and break times.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g. Study, Work, Coding"
                value={task.category}
                onChange={(e) => setTask({ ...task, category: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Task details..."
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={task.priority.toString()}
                onValueChange={(value) =>
                  setTask({
                    ...task,
                    priority: parseInt(value) as 1 | 2 | 3 | 4 | 5,
                  })
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Very Low</SelectItem>
                  <SelectItem value="2">Low</SelectItem>
                  <SelectItem value="3">Medium</SelectItem>
                  <SelectItem value="4">High</SelectItem>
                  <SelectItem value="5">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <hr />
            <AddWorkBreakSession
              steps={steps}
              setSteps={setSteps}
              addStep={addStep}
            />
            <hr />

            <div className="flex justify-end space-x-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Add Pomodoro</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewPomodoro;
