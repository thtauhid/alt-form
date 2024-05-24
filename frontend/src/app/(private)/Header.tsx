import { SquareDashedBottom } from "lucide-react";
import Link from "next/link";
import ProfilePage from "./ProfilePage";

export default function Header() {
  return (
    <div className="bg-[#3a0ca3] px-8 py-4 flex justify-between flex-no-wrap fixed top-0 w-full border-b-[#272643] border-b-2 z-10">
      <Link href="/dashboard" className="flex items-center gap-2">
        <SquareDashedBottom className="w-12 h-12 text-white cursor-pointer" />
        <div>
          <h1 className="text-white text-2xl font-bold">Alt Form</h1>
          <p className="text-white text-sm">Create any form</p>
        </div>
      </Link>
      <ProfilePage />
    </div>
  );
}
