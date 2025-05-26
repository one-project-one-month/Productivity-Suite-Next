"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navRoutes } from "./nav-routes";
import { Button } from "@/components/ui/button";
import { X, Menu, User } from "lucide-react";
import { ThemeBtn } from "./theme-btn";
import { Session } from "@/lib/server-util";
import ProfileDropdown from "@/features/profile/components/profile-dropdown";
import LogoutBtn from "./logout-btn";

export default function NavBar({ session }: { session: Session }) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="max-w-7xl bg-muted text-foreground py-3 px-6 mx-auto">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={"/"} className="font-bold text-lg cursor-pointer">
              <h1 className="font-black text-2xl bg-gradient-to-r from-blue-600 dark:from-blue-400 via-purple-500 to-blue-500 inline-block text-transparent bg-clip-text">
                FlowHub
              </h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4 items-center">
            {navRoutes.map((nav, idx) => (
              <Link
                title={nav.name}
                className={`text-sm font-medium transition py-1 px-2 rounded-md w-24 max-w-max min-[890px]:min-w-max text-ellipsis text-nowrap overflow-hidden ${
                  path.split("/").includes(nav.link.split("/")[1])
                    ? "text-foreground font-bold bg-foreground/10"
                    : "text-foreground/60 hover:bg-foreground/5"
                }`}
                key={idx}
                href={nav.link}
              >
                {nav.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {!!!session?.user && (
              <div className="hidden md:block">
                <Link href="/auth/sign-in">
                  <Button className="rounded-full px-6 py-2">Sign-In</Button>
                </Link>
              </div>
            )}

            <ThemeBtn isDesktop={true} />

            {
              !!session?.user && (
                // <div className="hidden md:grid size-7 rounded-full bg-muted border-ring border-2 place-items-center capitalize font-bold text-lg">
                <ProfileDropdown session={session} />
              )
              // </div>
            }
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} className="text-foreground" />
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background opacity-70 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-muted text-foreground z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-3">
          {session && (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                href="/profile"
                className={`hover:bg-foreground/5 text-sm font-medium rounded-md py-2 px-2 ${path == "/profile" ? "text-primary font-bold bg-foreground/10" : "text-foreground/60 hover:bg-foreground/5"}`}
              >
                <User className="inline size-7 pr-2" />
                Profile
              </Link>
              <hr />
            </>
          )}

          {navRoutes.map((nav, idx) => (
            <Link
              key={idx}
              href={nav.link}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium transition px-2 py-3 rounded-md flex gap-3 items-center ${
                path.split("/").includes(nav.link.split("/")[1])
                  ? "text-primary font-bold bg-foreground/10"
                  : "text-foreground/60 hover:bg-foreground/5"
              }`}
            >
              <span className="block size-5 pr-3">{nav.icon}</span>
              {nav.name}
            </Link>
          ))}
          <hr className="my-2" />

          {!session ? (
            <Link href="/auth/sign-in">
              <Button
                className="w-full rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Sign-In
              </Button>
            </Link>
          ) : (
            <LogoutBtn />
          )}

          <ThemeBtn isDesktop={false} />
        </div>
      </div>
    </>
  );
}
