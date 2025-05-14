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

// Step now holds either work or break, not both
type Step = { type: "work" | "break"; duration: number | null };

interface PomodoroTask {
  category: string;
  description: string;
  durations: number[];
  breakTimes: number[];
  priority: 1 | 2 | 3;
}

const AddNewPomodoro = () => {
  const [task, setTask] = useState<PomodoroTask>({
    category: "",
    description: "",
    durations: [],
    breakTimes: [],
    priority: 2,
  });

  // Start with a work step
  const [steps, setSteps] = useState<Step[]>([
    { type: "work", duration: 25 },
    { type: "break", duration: 5 },
  ]);

  // Add new step, alternating between work and break
  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { type: "work", duration: 25 },
      { type: "break", duration: 5 },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      user_id: "user123",
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

    console.log("Sequence:", sequence);
    console.log("Timer Sequence:", timerSequence);

    // ✅ Reset steps to initial state
    setSteps([
      { type: "work", duration: 25 },
      { type: "break", duration: 5 },
    ]);

    // ✅ Optionally reset task form fields too
    setTask({
      category: "",
      description: "",
      durations: [],
      breakTimes: [],
      priority: 2,
    });
  };

  return (
    <div className="w-full border-dashed border-2 border-gray-300 py-2 rounded-lg flex items-center justify-between ">
      <Dialog>
        <DialogTrigger className="w-full h-full bg-transparent text-lg outline-none text-gray-300 cursor-pointer px-4 py">
          Add New Pomodoro...
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
                  setTask({ ...task, priority: parseInt(value) as 1 | 2 | 3 })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Low</SelectItem>
                  <SelectItem value="2">Medium</SelectItem>
                  <SelectItem value="3">High</SelectItem>
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
                <Button type="submit">Start Pomodoro</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewPomodoro;
