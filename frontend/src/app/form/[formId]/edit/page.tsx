import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/types";
import Link from "next/link";
import React from "react";
import AddField from "./AddField";
import CurrentFields from "./CurrentFields";

interface Props {
  params: {
    formId: string;
  };
}

async function getData(formId: string) {
  const res = await fetch("http://localhost:4000/forms/" + formId + "??????");
  const data = await res.json();

  return data as Form;
}

export default async function EditForm(props: Props) {
  const data = await getData(props.params.formId);

  return (
    <div>
      <div className="pb-4 mb-4 border-b-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <div className="space-x-2">
            <Link href={`/form/${props.params.formId}/submissions`}>
              <Button>View Submission</Button>
            </Link>
          </div>
        </div>
        <p>{data.description}</p>
      </div>

      <div className="space-y-8">
        <CurrentFields fields={data.fields} />
        <AddField />
      </div>
    </div>
  );
}
