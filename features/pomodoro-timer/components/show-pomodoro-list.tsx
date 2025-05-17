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
import { useState, useEffect, useMemo } from "react";
import { useGetSequenceDataByUserId } from "../hooks/use-get-sequence-data-by-userId";

interface PomodoroProps {
  userId: string;
}

const ShowPomodoroList = ({ userId }: PomodoroProps) => {
  const { data: sequences } = useGetSequenceDataByUserId(userId);

  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const savedId = localStorage.getItem("selectedPomodoroId");
    if (savedId) {
      setSelectedId(savedId);
    }
  }, []);

  const handlePomodoroSelect = (id: string, description: string) => {
    setSelectedId(id);
    localStorage.setItem("selectedPomodoroId", id);
    localStorage.setItem("selectedPomodoroDescription", description);
  };

  const handleDelete = (id: string) => {
    if (selectedId === id) {
      setSelectedId("");
      localStorage.removeItem("selectedPomodoroId");
      localStorage.removeItem("selectedPomodoroDescription");
    }
  };

  const categories = useMemo(() => {
    if (!sequences) return ["all"];
    const unique = Array.from(new Set(sequences.map((s) => s.category)));
    return ["all", ...unique];
  }, [sequences]);

  const filteredSequences = useMemo(() => {
    if (!sequences) return [];
    if (selectedCategory === "all") return sequences;
    return sequences.filter((s) => s.category === selectedCategory);
  }, [sequences, selectedCategory]);

  return (
    <div className="w-10 flex justify-center items-center">
      <Dialog>
        <DialogTrigger className="rounded-full p-2 hover:bg-gray-200/10 transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            className="w-6 h-6 md:w-8 md:h-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
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

          <div className="h-40 md:h-55 lg:h-64 overflow-y-scroll">
            {filteredSequences.length > 0 ? (
              filteredSequences.map((sequence) => (
                <div
                  key={sequence.id}
                  onClick={() =>
                    handlePomodoroSelect(
                      sequence.id,
                      sequence.description || "",
                    )
                  }
                  className={`cursor-pointer transition-all duration-200 hover:bg-gray-100/10 ${
                    selectedId === sequence.id
                      ? "bg-primary/20 rounded-2xl"
                      : ""
                  }`}
                >
                  <PomodoroCard
                    id={sequence.id}
                    category={sequence.category || ""}
                    description={sequence.description || ""}
                    onDelete={handleDelete}
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
