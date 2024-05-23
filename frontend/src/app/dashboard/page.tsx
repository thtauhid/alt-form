"use client";
import { useGetForms } from "@/hooks";
import Loading from "@/lib/loading";
import { EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { data, isLoading, isError } = useGetForms();

  if (isLoading) <Loading />;

  if (isError) {
    return (
      <div>
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-4xl text-">Something Went Wrong</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div className="flex justify-center items-center h-[80vh] flex-col gap-8">
          <p className="text-4xl text-">No Form Found</p>

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
        </div>
      </div>
    );
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
