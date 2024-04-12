import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/types";
import React from "react";
import FormPage from "./form";

interface Props {
  params: {
    formId: string;
  };
}

async function getData(formId: string) {
  const res = await fetch("http://localhost:4000/forms/" + formId + "????");
  const data = await res.json();

  return data as Form;
}

export default async function SubmitForm(props: Props) {
  const data = await getData(props.params.formId);

  return (
    <div>
      <div className="pb-4 mb-4 border-b-2">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p>{data.description}</p>
      </div>

      <FormPage fields={data.fields} formId={props.params.formId} />

      {/* <div className="space-y-8">
        {data.fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <div key={field.id} className="border p-4 bg-gray-100">
                  <Label>{field.name}</Label>
                  <Input placeholder={field.placeholder} className="mt-2" />
                </div>
              );

            default:
              return null;
          }
        })}

        <Button className="w-full">Submit</Button>
      </div> */}
    </div>
  );
}
