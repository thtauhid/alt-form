"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserStore } from "@/store/userStore";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const user = useUserStore((state) => ({
    token: state.token,
    name: state.name,
    image: state.image,
    clearUser: state.clearUser,
  }));

  function logoutHandler() {
    localStorage.removeItem("token");
    user.clearUser();
    router.push("/auth/login");
  }

  if (user.token) {
    return (
      <Sheet>
        <SheetTrigger>
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.image} />
            <AvatarFallback className="bg-[#3a0ca3]">
              <UserRound className="w-12 h-12 bg-[#3a0ca3] text-white" />
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
            <div>
              <p>{user.name}</p>
              <Button variant="destructive" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return null;
}
