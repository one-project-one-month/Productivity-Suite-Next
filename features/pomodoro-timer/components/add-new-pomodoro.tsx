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
import {
  useAddTimer,
  useAddTimerSequence,
  useAddTimerSequenceToDb,
} from "../hooks/use-add-timer-sequence";
import { Plus } from "lucide-react";

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
  const { mutateAsync: addTimerToDb } = useAddTimer();
  const { mutateAsync: addTimerSequenceToDb } = useAddTimerSequenceToDb();

  const [task, setTask] = useState<PomodoroTask>({
    category: "",
    description: "",
    durations: [],
    breakTimes: [],
    priority: 2,
  });

  // Start with a work step
  const [steps, setSteps] = useState<Step[]>([{ type: "work", duration: 25 }]);
  // console.log("STEPS: ", steps);

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

    requestIdleCallback(async () => {
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
      const seq = await mutateAsync(payload);

      timerSequence.forEach(async ({ timer }, idx) => {
        const res = await addTimerToDb({
          duration: timer.duration * 60,
          remaining: timer.duration * 60,
          type: timer.type == "work" ? "FOCUS" : "BREAK",
        });
        const timerSeq = await addTimerSequenceToDb({
          timerId: res[0].id,
          sequenceId: seq.id,
          step: timerSequence[idx].step,
        });
        console.log("RES >>", res);
        console.log("TIMER SEQ >>", timerSeq);
      });

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
        <DialogTrigger className="w-full h-full bg-transparent outline-none text-primary/80 hover:text-primary cursor-pointer px-4 py-1.5 flex items-center gap-2">
          <Plus size={18} />
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
