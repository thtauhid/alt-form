"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquareDashedBottom } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const token = localStorage.getItem("token");

export default function Header() {
  const router = useRouter();
  function logoutHandler() {
    localStorage.removeItem("token");
    router.push("/auth/login");
  }

  return (
    <div className="bg-[#3a0ca3] px-8 py-4 flex justify-between flex-no-wrap fixed top-0 w-full border-b-[#272643] border-b-2 z-10">
      <Link href="/" className="flex items-center gap-2">
        <SquareDashedBottom className="w-12 h-12 text-white cursor-pointer" />
        <div>
          <h1 className="text-white text-2xl font-bold">Alt Form</h1>
          <p className="text-white text-sm">Create any form</p>
        </div>
      </Link>
      {token && (
        <Sheet>
          <SheetTrigger>
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/thtauhid.png" />
              <AvatarFallback>TH</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Profile</SheetTitle>
              <div>
                <p>Tasnimul Hasan Tauhid</p>
                <Button variant="destructive" onClick={logoutHandler}>
                  Logout
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
