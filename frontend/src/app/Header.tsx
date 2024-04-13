import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { DiamondIcon, NotebookText, SquareDashedBottom } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-[#3c2a4d] px-8 py-4 flex justify-between flex-no-wrap fixed top-0 w-full border-b-[#272643] border-b-2">
      <Link href="/" className="flex items-center gap-2">
        <SquareDashedBottom className="w-12 h-12 text-white cursor-pointer" />
        <div>
          <h1 className="text-white text-2xl font-bold">Alt Form</h1>
          <p className="text-white text-sm">Create any form</p>
        </div>
      </Link>

      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/thtauhid.png" />
        <AvatarFallback>TH</AvatarFallback>
      </Avatar>
    </div>
  );
}
