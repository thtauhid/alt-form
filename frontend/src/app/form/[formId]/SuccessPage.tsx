import { BadgeCheckIcon } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center flex-col text-[#3c2a4d] gap-4 p-8">
      <BadgeCheckIcon className="" size={64} />
      <h1 className="text-3xl font-bold">Form Submitted</h1>
    </div>
  );
}
