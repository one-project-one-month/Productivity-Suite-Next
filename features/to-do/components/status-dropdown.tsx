"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

export const StatusDropdown = ({ id, currentStatus }: { id: number; currentStatus: string }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="underline">changeStatus</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer text-yellow-500 font-medium">PENDING
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-green-500 font-medium">COMPLETED
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500 font-medium">OVERDUE
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
