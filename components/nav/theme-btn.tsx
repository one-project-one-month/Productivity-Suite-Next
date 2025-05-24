"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeBtn({ isDesktop }: { isDesktop: boolean }) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`relative ${isDesktop && "hidden md:block md:w-10"}`}
        >
          <Sun
            style={
              isDesktop
                ? { position: "absolute", left: "10px", top: "10px" }
                : {}
            }
            className="h-[1.2rem] top-2.5 left-10 rotate-0 text-foreground scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            style={
              isDesktop
                ? { position: "absolute", left: "10px", top: "10px" }
                : {}
            }
            className="h-[1.2rem] top-2.5 left-10 text-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span
            className="text-foreground"
            style={isDesktop ? { display: "none" } : {}}
          >
            Toggle theme
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
