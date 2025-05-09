// import Note from "@/features/notes/components/note";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Note from "@/features/notes/components/note";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata:Metadata = {
  title: {
    template: "%s | Note",
    default: "Notes",
  },
  description: "Notes Taking app",
};

const dummyNotes = [
  {
    id: 1,
    title: "Note 1",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus repellat numquam temporibus veniam aut ullam nemo alias nam rem ut!",
    createdAt: new Date("3 4 2025"),
    updatedAt: new Date("5 5 2025"),
  },
  {
    id: 2,
    title: "Note 2",
    body: "Lorem ipsum dolor sit amet lat numquam temporibus veniam aut ullam nemo alias nam rem ut!",
    createdAt: new Date("7 4 2024"),
    updatedAt: new Date("5 5 2025"),
  },
  {
    id: 3,
    title: "Note 3",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus repellat numquam temporibus veniam aut ullam nemo alias nam rem ut!",
    createdAt: new Date("3 4 2025"),
    updatedAt: new Date("5 5 2025"),
  },
  {
    id: 4,
    title: "Note 4",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus repellat numquam temporibus veniam aut ullam nemo alias nam rem ut!",
    createdAt: new Date("3 4 2025"),
    updatedAt: new Date("5 5 2025"),
  },
];

export default function NotePage() {
  return (
    <section className="bg-background text-foreground max-w-7xl mx-auto">
      
      <div className="flex gap-3 items-center justify-center mb-2">
        <Input type="search" placeholder="search..." className="max-w-md" />
        <Button className="bg-yellow-400 hover:bg-yellow-500"> <Plus /> New Note</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 ">
        {
          dummyNotes.map((item, idx) => (
            <Link href={`/notes/${item.id}`} key={idx}>
              <Note {...item}/>
            </Link>
          ))
        }
      </div>
    </section>
  );
}
