"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navRoutes } from "./nav-routes";
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui or similar

export default function NavBar() {
  const path = usePathname();

  return (
    <nav className="w-full bg-black text-white py-3 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">Productivity Suite</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {navRoutes.map((nav, idx) => (
            <Link
              title={nav.name}
              className={`text-sm font-medium hover:text-gray-300 transition ${
                path === nav.link ? "text-white underline" : "text-gray-400"
              }`}
              key={idx}
              href={nav.link}
            >
              {nav.name}
            </Link>
          ))}
        </div>

        <div>
          <Button variant="secondary" className="rounded-full px-6 py-2">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
