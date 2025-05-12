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
import { usePomodoro } from "../hooks/usePomodoro";

// Type definition for individual step containing work and break duration
type Step = { work: number | null; break: number | null };

// Interface for the overall Pomodoro task
interface PomodoroTask {
  category: string;
  description: string;
  durations: number[];
  breakTimes: number[];
  priority: 1 | 2 | 3; // low, medium, high
}

const AddNewPomodoro = () => {
  // State to hold overall Pomodoro task data
  const { startTimer } = usePomodoro();
  const [task, setTask] = useState<PomodoroTask>({
    category: "",
    description: "",
    durations: [],
    breakTimes: [],
    priority: 2, // medium
  });

  // State to manage the dynamic list of steps (work + break sessions)
  const [steps, setSteps] = useState<Step[]>([{ work: 25, break: 5 }]);

  // Adds a new empty step
  const addStep = () => {
    setSteps((prev) => [...prev, { work: null, break: null }]);
  };

  // Removes a specific step by index
  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filters out incomplete steps
    const validSteps = steps.filter((s) => s.work !== null);

    // Extracts work and break durations
    const durations = validSteps.map((s) => s.work as number);
    const breakTimes = validSteps.map((s) => (s.break !== null ? s.break! : 5));

    // Updates task state with processed durations and breaks
    setTask((prev) => ({
      ...prev,
      durations,
      breakTimes,
    }));

    // Creates task summary data
    const sequence = {
      user_id: "user123",
      category: task.category,
      description: task.description,
      priority: task.priority,
      created: new Date().toISOString(),
    };

    // Prepares timer sequence for Pomodoro rounds
    const timerSequence = durations.map((duration, index) => ({
      step: index + 1,
      timer: {
        duration,
        remaining: duration,
        type: "work",
      },
      break: {
        duration: breakTimes[index] || 5,
        remaining: breakTimes[index] || 5,
        type: "break",
      },
    }));

    // Logs results (you can replace this with actual saving logic)
    console.log("Sequence:", sequence);
    console.log("Timer Sequence:", timerSequence);
  };

  return (
    <div className="w-full border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-between">
      <Dialog>
        {/* Button to trigger dialog */}
        <DialogTrigger className="w-full h-full bg-transparent text-lg outline-none text-gray-300 cursor-pointer px-4 py-2">
          Enter New Pomodoro...
        </DialogTrigger>

        {/* Dialog box content */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Pomodoro</DialogTitle>
            <DialogDescription>
              Set your task details, focus and break durations, and priority
              level.
            </DialogDescription>
          </DialogHeader>

          {/* Pomodoro input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category input */}
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

            {/* Description input */}
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

            {/* Priority selector */}
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

            {/* Dynamic step inputs for work/break durations */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Work duration selector */}
                  <div className="space-y-1">
                    <Label>Work</Label>
                    <Select
                      value={step.work?.toString() || ""}
                      onValueChange={(value) => {
                        const updated = [...steps];
                        updated[index].work = parseInt(value);
                        setSteps(updated);
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="20">20 min</SelectItem>
                        <SelectItem value="25">25 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="45">45 min</SelectItem>
                        <SelectItem value="60">60 min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Break duration selector */}
                  <div className="space-y-1">
                    <Label>Break</Label>
                    <Select
                      value={step.break?.toString() || ""}
                      onValueChange={(value) => {
                        const updated = [...steps];
                        updated[index].break = parseInt(value);
                        setSteps(updated);
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 min</SelectItem>
                        <SelectItem value="5">5 min</SelectItem>
                        <SelectItem value="10">10 min</SelectItem>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="20">20 min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Remove step button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeStep(index)}
                    title="Remove step"
                  >
                    ✕
                  </Button>
                </div>
              ))}

              {/* Add new step button */}
              <Button type="button" variant="secondary" onClick={addStep}>
                Add New Step
              </Button>
            </div>

            {/* Form action buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={startTimer}>
                  Start Pomodoro
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewPomodoro;
