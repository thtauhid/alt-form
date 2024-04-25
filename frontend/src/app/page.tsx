"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetForms } from "@/hooks";
import { EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError, isFetched } = useGetForms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!data) {
    return <div>No forms found</div>;
  }

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-8">
        <Link
          href="/form/create"
          className="bg-blue-400/30 group rounded-md border border-blue-400/40 p-4 hover:border-blue-400 flex items-center justify-center"
        >
          <Plus
            strokeWidth={2.5}
            size={36}
            className="text-[#14213d]/80 group-hover:text-[#14213d]"
          />
          <p className="text-3xl font-bold  hover:cursor-pointer text-[#14213d]/80 group-hover:text-[#14213d]">
            NEW FORM
          </p>
        </Link>

        {data.map((form) => {
          return (
            <Link href={`/form/${form.id}`} key={form.id} className="">
              <div className=" bg-[#4cc9f0]/30 rounded-md border border-blue-400/40 p-4 hover:border-blue-400 group hover:cursor-pointer">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold text-slate-700 group-hover:text-slate-900 truncate">
                    {form.title}
                  </h2>
                  <div className="hover:cursor-pointer">
                    <EllipsisVertical strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-slate-700  group-hover:text-slate-900 font-normal">
                  {form.description}
                </p>
                <div className="text-white flex mt-4">
                  <p className="py-1 px-2.5 bg-[#3a0ca3]/80   rounded-full text-sm font-semibold text-white">
                    {
                      // @ts-ignore
                      form.FormResponse.length
                    }{" "}
                    Responses
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
