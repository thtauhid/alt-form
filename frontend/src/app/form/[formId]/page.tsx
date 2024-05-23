"use client";
import { Button } from "@/components/ui/button";
import { useGetForm } from "@/hooks";
import Loading from "@/lib/loading";
import { MailsIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import FormPage from "./FormPage";

interface Props {
  params: {
    formId: string;
  };
}

export default function SubmitForm(props: Props) {
  const { data, isError, isLoading } = useGetForm(props.params.formId);

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
          <p className="text-4xl text-">Form Not Found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-4 mb-4 border-b-2 border-b-[#3c2a4d] flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p>{data.description}</p>
        </div>
        <div className="space-x-2">
          <Link href={`/form/${props.params.formId}/edit`}>
            <Button>
              <PencilIcon className="mr-2" size={18} />
              Edit
            </Button>
          </Link>
          <Link href={`/form/${props.params.formId}/responses`}>
            <Button>
              <MailsIcon className="mr-2" size={18} />
              Responses
            </Button>
          </Link>
        </div>
      </div>

      <FormPage fields={data.fields} formId={props.params.formId} />
    </div>
  );
}
