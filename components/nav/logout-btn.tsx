"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          className="cursor-pointer w-full"
        >
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="space-x-2 *:cursor-pointer mt-5">
                <DialogClose asChild>
                  <Button size="sm" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() =>
                      authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            router.push("/");
                            router.refresh();
                          },
                        },
                      })
                      
                    }
                  >
                    Logout
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
