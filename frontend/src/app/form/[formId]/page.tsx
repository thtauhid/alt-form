"use client";
import React from "react";
import FormPage from "./FormPage";
import { useGetForm } from "@/hooks";

interface Props {
  params: {
    formId: string;
  };
}

export default function SubmitForm(props: Props) {
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
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p>{data.description}</p>
      </div>

      <FormPage fields={data.fields} formId={props.params.formId} />
    </div>
  );
}
