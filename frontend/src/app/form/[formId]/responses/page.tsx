"use client";

import { Button } from "@/components/ui/button";
import { useGetForm, useGetFormResponses } from "@/hooks";
import Link from "next/link";

interface Props {
  params: {
    formId: string;
  };
}

export default function Responses(props: Props) {
  const { data: formData, isLoading } = useGetForm(props.params.formId);
  const { data: responseData } = useGetFormResponses(props.params.formId);

  console.log(responseData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    return <div>Form not found</div>;
  }

  return (
    <div>
      <div className="pb-4 mb-4 border-b-2 border-b-[#3c2a4d]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{formData.title}</h1>
          <div className="space-x-2">
            <Link href={`/form/${props.params.formId}/edit`}>
              <Button>Edit Form</Button>
            </Link>
          </div>
        </div>
        <p>{formData.description}</p>
      </div>

      <div>
        {responseData &&
          responseData.map((response: any) => (
            <div key={response.id} className="border p-4 bg-gray-100">
              <div className="space-y-4">
                {response.response.map((field: any) => (
                  <div key={field.question}>
                    <p className="text-lg font-bold">{field.question}</p>
                    <p>{field.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
