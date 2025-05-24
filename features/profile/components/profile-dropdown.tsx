import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Session } from "@/lib/server-util";
import Link from "next/link";
import LogoutBtn from "@/components/nav/logout-btn";

export default function ProfileDropdown({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hidden md:block">
        <Button
          className="rounded-full cursor-pointer uppercase font-bold aspect-square"
          variant="outline"
          size="icon"
        >
          {session?.user.name[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="space-y-2">
        <DropdownMenuItem>
          <Link href="/profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
