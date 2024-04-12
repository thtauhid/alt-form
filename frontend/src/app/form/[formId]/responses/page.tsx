import { Button } from "@/components/ui/button";
import { Form, FormResponse } from "@/types";
import Link from "next/link";

interface Props {
  params: {
    formId: string;
  };
}

async function getFormData(formId: string) {
  const res = await fetch("http://localhost:4000/forms/" + formId + "??????");
  const data = await res.json();

  return data as Form;
}

async function getResponseData(formId: string) {
  const res = await fetch("http://localhost:4000/responses/?formId=" + formId);
  const data = await res.json();

  return data as FormResponse[];
}

export default async function Responses(props: Props) {
  const formData = await getFormData(props.params.formId);
  const responseData = await getResponseData(props.params.formId);
  console.log(responseData);

  return (
    <div>
      <div className="pb-4 mb-4 border-b-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{formData.title}</h1>
          <div className="space-x-2">
            <Link href={`/form/${props.params.formId}/submissions`}>
              <Button>View Submission</Button>
            </Link>
          </div>
        </div>
        <p>{formData.description}</p>
      </div>

      <div>
        {responseData.map((response) => (
          <div key={response.id} className="border p-4 bg-gray-100">
            <h2 className="text-xl font-bold">Response {response.id}</h2>
            <div className="space-y-4">
              {response.fields.map((field) => (
                <div key={field.id}>
                  <p className="text-lg font-bold">{field.id}</p>
                  <p>{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
