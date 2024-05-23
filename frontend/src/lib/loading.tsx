import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <LoaderCircleIcon size={80} className="animate-spin text-[#3a0ca3]" />
    </div>
  );
}
