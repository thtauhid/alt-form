"use client";
import { Button } from "@/components/ui/button";
import { useGetForm } from "@/hooks";
import { BookIcon, LoaderCircleIcon, MailsIcon } from "lucide-react";
import Link from "next/link";
import AddField from "./AddField";
import CurrentFields from "./CurrentFields";

interface Props {
  params: {
    formId: string;
  };
}

export default function EditForm(props: Props) {
  const { data, isError, isLoading } = useGetForm(props.params.formId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoaderCircleIcon size={80} className="animate-spin text-[#3a0ca3]" />
      </div>
    );
  }

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
      <div className="pb-4 mb-4 border-b-2 border-b-[#3c2a4d]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <div className="space-x-2">
            <Link href={`/form/${props.params.formId}`}>
              <Button>
                <BookIcon className="mr-2" size={18} />
                View Form
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
        <p>{data.description}</p>
      </div>

      <div className="space-y-8">
        <CurrentFields fields={data.fields} />
        <AddField formId={props.params.formId} />
      </div>
    </div>
  );
}
