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
import AddNewPomodoro from "./add-new-pomodoro";
import PomodoroCard from "./pomodoros-card";
import { useState } from "react";

const ShowPomodoroList = () => {
  const [cards, setCards] = useState([
    { id: 1, content: "Pomodoro 1" },
    { id: 2, content: "Pomodoro 2" },
    { id: 3, content: "Pomodoro 3" },
    { id: 4, content: "Pomodoro 4" },
    { id: 5, content: "Pomodoro 5" },
  ]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropTarget(index);
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const newCards = [...cards];
    const draggedCard = newCards[dragIndex];

    newCards.splice(dragIndex, 1);
    newCards.splice(dropIndex, 0, draggedCard);

    setCards(newCards);
    setDraggedIndex(null);
    setDropTarget(null);
  };

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
            <DialogClose asChild>
              <AddNewPomodoro />
            </DialogClose>
          </DialogHeader>
          <div className="h-40 md:h-55 lg:h-64 overflow-y-scroll">
            {cards.map((card, index) => (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  cursor-move transition-all duration-200
                  ${draggedIndex === index ? "opacity-50 scale-95" : ""}
                  ${dropTarget === index ? "border rounded-2xl  border-primary translate-y-2" : ""}
                `}
              >
                <PomodoroCard id={card.id} content={card.content} />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowPomodoroList;
