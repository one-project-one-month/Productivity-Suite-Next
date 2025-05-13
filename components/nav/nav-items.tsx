"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navRoutes } from "./nav-routes";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

export default function NavBar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-black text-white py-3 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={"/"} className="font-bold text-lg cursor-pointer">
              Productivity Suite
            </Link>
          </div>

          {/* Desktop Nav */}
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

          <div className="hidden md:block">
            <Button variant="secondary" className="rounded-full px-6 py-2">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          {navRoutes.map((nav, idx) => (
            <Link
              key={idx}
              href={nav.link}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium transition hover:text-gray-300 ${
                path === nav.link ? "text-white underline" : "text-gray-400"
              }`}
            >
              {nav.name}
            </Link>
          ))}

          <Button
            variant="secondary"
            className="mt-6 w-full rounded-full"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
