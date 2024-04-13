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

  return (
    <main className="">
      <div className="grid grid-cols-3 gap-4">
        <Link
          href="/form/create"
          className="bg-[#574f7d] flex items-center justify-center"
        >
          <Plus size={48} className="text-white" />
          <p className="text-3xl font-bold text-white">NEW FORM</p>
        </Link>

        <div className=""></div>
        {data!.map((form) => {
          return (
            <Card key={form.id}>
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-end">
                <Link href={`/form/${form.id}`}>
                  <Button>View</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
