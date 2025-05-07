"use client";

import Link from "next/link";
import { navRoutes } from "./nav-routes";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const path = usePathname();
  return (
    <div className="flex sm:items-center w-full gap-2 md:gap-5 items-center p-1 sm:p-3">
      {
        navRoutes.map((nav, idx) => (
          <Link title={nav.name} className={`group basis-1/4 sm:basis-auto px-2 w-20 sm:w-fit py-1 sm:py-2 rounded-sm space-x-1 sm:flex sm:items-center ${path == nav.link ? "bg-white text-foreground" : `bg-muted text-muted-foreground hover:bg-muted-foreground/10`}`} key={idx} href={nav.link}>
            <div className="text-background py-1 rounded-sm grid place-items-center group-hover:*:scale-105 transition px-1.5 " style={{ backgroundColor: nav.color }}>
              {nav.icon}
            </div>
            <span className="text-xs text-center sm:text-base sm:text-left inline-block w-full text-nowrap text-ellipsis truncate font-medium">
              {nav.name}
            </span>
          </Link>
        ))
      }
    </div>
  );
}
