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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddNewPomodoro from "./add-new-pomodoro";
import PomodoroCard from "./pomodoros-card";
import { useState } from "react";
import { useGetSequenceDataByUserId } from "../hooks/use-get-sequence-data-by-userId";
import { Settings } from "lucide-react";
import { useSelectedId } from "../hooks/use-selected-id";
import { TLocalPomodoroState } from "./pomodoro-timer";
import { useUpdateTimer } from "../hooks/use-update-timer";

interface PomodoroProps {
  userId: string;
  localState: TLocalPomodoroState;
}

const ShowPomodoroList = ({ userId, localState }: PomodoroProps) => {
  const { selectedId, setSelectedId } = useSelectedId();
  const { data: sequences } = useGetSequenceDataByUserId(userId);
  const { mutate: updateTimer } = useUpdateTimer();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handlePomodoroSelect = async (
    id: string,
    description: string,
    category: string,
  ) => {
    setSelectedId(id);
    updateTimer({ timerId: id, remaining: localState.currentTime });

    localStorage.setItem(
      "pomodoroSequence",
      JSON.stringify({ id, description, category }),
    );

    localStorage.setItem("pomodoro-state", JSON.stringify(localState));

    // if (isSuccess) {
    //   setWorkTime(timerSequence[0].timer.duration);
    //   setTime(timerSequence[0].timer.remaining);
    // }
  };

  // const handleDelete = async (id: string) => {
  //   if (selectedId === id) {
  //     setSelectedId("");
  //     localStorage.removeItem("selectedPomodoroId");
  //     localStorage.removeItem("selectedPomodoroDescription");
  //   }
  // };

  // const category = useMemo(() => {
  //   if (!sequences) return ["all"];
  //   const unique = Array.from(new Set(sequences.map((s) => s.category)));
  //   return ["all", ...unique];
  // }, [sequences]);
  const categories = [
    "all",
    ...Array.from(new Set(sequences?.map((s) => s.category))),
  ];

  // const filteredSequences = useMemo(() => {
  //   if (!sequences) return [];
  //   if (selectedCategory === "all") return sequences;
  //   return sequences.filter((s) => s.category === selectedCategory);
  // }, [sequences, selectedCategory]);
  const filteredSequences = !sequences
    ? []
    : selectedCategory == "all"
      ? sequences
      : sequences?.filter((s) => s.category === selectedCategory);

  return (
    <div className="w-10 flex justify-center items-center z-50 isolate">
      <Dialog>
        <DialogTrigger className="rounded-full cursor-pointer p-2 hover:bg-gray-200/10 transition-colors">
          <Settings />
        </DialogTrigger>

        <DialogContent className="w-[90vw] max-w-[425px] md:w-full">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl md:text-2xl">
              Pomodoro List
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base">
              Check Your List Here!
            </DialogDescription>
            <div className="flex justify-between items-center gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category || ""}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DialogClose asChild>
                <AddNewPomodoro />
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="min-h-40 md:h-55 lg:h-64 overflow-y-auto">
            {filteredSequences.length > 0 ? (
              filteredSequences.map((sequence) => (
                <div
                  key={sequence.id}
                  onClick={() =>
                    handlePomodoroSelect(
                      sequence.id,
                      sequence.description || "",
                      sequence.category || "",
                    )
                  }
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedId === sequence.id
                      ? "bg-green-400/10 rounded-2xl"
                      : "hover:bg-muted-foreground/10"
                  }`}
                >
                  <PomodoroCard
                    id={sequence.id}
                    category={sequence.category || ""}
                    description={sequence.description || ""}
                    // onDelete={handleDelete}
                    priority={sequence.priority}
                  />
                </div>
              ))
            ) : (
              <p>Oh no! There is no Sequences. Create one first!</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowPomodoroList;
