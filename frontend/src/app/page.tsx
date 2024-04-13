"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetForms } from "@/hooks";
import { Plus } from "lucide-react";
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
    <main className="">
      <div className="grid grid-cols-3 gap-8">
        <Link
          href="/form/create"
          className="bg-[#574f7d] flex items-center justify-center"
        >
          <Plus size={48} className="text-white" />
          <p className="text-3xl font-bold text-white">NEW FORM</p>
        </Link>

        {data.map((form) => {
          return (
            <Link
              href={`/form/${form.id}`}
              key={form.id}
              className="hover:border-[#3c2a4d] border border-transparent"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{form.title}</CardTitle>
                  <CardDescription>{form.description}</CardDescription>
                </CardHeader>

                <div className="px-6 py-2 text-white bg-[#3c2a4d]">
                  {
                    // @ts-ignore
                    form.FormResponse.length
                  }{" "}
                  Responses
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
