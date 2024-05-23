"use client";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const router = useRouter();

  function logoutHandler() {
    localStorage.removeItem("token");
    router.push("/auth/login");
  }

  return (
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
  );
}
