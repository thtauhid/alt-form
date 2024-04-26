"use client";

import { Button } from "@/components/ui/button";
import { useGetForm, useGetFormResponses } from "@/hooks";
import { BookIcon, PencilIcon } from "lucide-react";
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
              <Button>
                <PencilIcon className="mr-2" size={18} />
                Edit
              </Button>
            </Link>
            <Link href={`/form/${props.params.formId}`}>
              <Button>
                <BookIcon className="mr-2" size={18} />
                View Form
              </Button>
            </Link>
          </div>
        </div>
        <p>{formData.description}</p>
      </div>

      <div className="space-y-2">
        {responseData &&
          responseData.map((response: any) => (
            <div
              key={response.id}
              className="border border-[#4cc9f0]/30 p-4 bg-[#4cc9f0]/30 rounded-md"
            >
              <table className="w-full table border-collapse border border-slate-500">
                <tbody>
                  {response.response.map((field: any) => (
                    <tr key={field.question} className="border border-black">
                      <td className="p-4 border-r border-slate-500 text-lg font-bold">
                        {field.question}
                      </td>
                      <td className="p-4">
                        {field.answer}

                        {field.fieldType === "CHECKBOX" &&
                          (field.answer ? "✅" : "❌")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
