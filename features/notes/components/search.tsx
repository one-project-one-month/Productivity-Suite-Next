"use client";

// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { X } from "lucide-react";
// import { useState } from "react";

export default function Search({ q, action }: { q:string, action: (formdata: FormData) => Promise<void>}) {
  // const [clear, setClear] = useState(false);
  
  return (
    <div className="flex relative">
      <form action={action} >
        <Input type="search" defaultValue={q} name="q" placeholder="search..." className="max-w-md" />
      </form >

      {/* {q && <form action={resetAction} className="absolute right-0">
        <Button variant="ghost" className="pl-1!"> <X /> </Button>
      </form>} */}
    </div>
  );
}
