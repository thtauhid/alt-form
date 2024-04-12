import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/types";
import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:4000/forms?");
  const data = await res.json();

  return data as Form[];
}

export default async function Home() {
  const data = await getData();

  console.log(data);

  return (
    <main className="">
      <div className="flex justify-between items-center pb-4 mb-4 border-b-2">
        <h1 className="text-3xl font-bold">Alt Form</h1>
        <Button>New</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.map((form) => {
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
