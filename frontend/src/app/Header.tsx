import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-[#2c698d] px-8 py-4 flex justify-between">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Alt Form"
          width={200}
          height={42.19}
          priority
        />
      </Link>

      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/thtauhid.png" />
        <AvatarFallback>TH</AvatarFallback>
      </Avatar>
    </div>
  );
}
