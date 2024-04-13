"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/types";
import Link from "next/link";
import React from "react";
import AddField from "./AddField";
import CurrentFields from "./CurrentFields";
import { useQuery } from "@tanstack/react-query";
import { useGetForm } from "@/hooks";
import { BookIcon, MailsIcon } from "lucide-react";

interface Props {
  params: {
    formId: string;
  };
}

export default function EditForm(props: Props) {
  const { data, isLoading } = useGetForm(props.params.formId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Form not found</div>;
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
