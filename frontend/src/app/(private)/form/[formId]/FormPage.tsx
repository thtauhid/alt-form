"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSubmitResponse } from "@/hooks";
import { FormField as FormFieldType } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SuccessPage from "./SuccessPage";
import GENERAL from "./GENERAL";
import RADIO from "./RADIO";
import CHECKBOX from "./CHECKBOX";

interface Props {
  fields: FormFieldType[];
  formId: string;
}

export default function FormPage(props: Props) {
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate } = useSubmitResponse(props.formId);

  const form = useForm();

  async function onSubmit(values: Record<string, string>) {
    console.log(values);

    try {
      const fields = Object.keys(values).map((key) => ({
        question: key,
        answer: values[key],
        fieldType: props.fields.filter((field) => field.title === key)[0].type,
      }));

      mutate(
        { response: fields },
        {
          onSuccess: () => {
            toast.success("Form submitted successfully");
            setIsSuccess(true);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to submit form");
    }
  }

  if (isSuccess) {
    return <SuccessPage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {props.fields.map((field) => {
          switch (field.type) {
            case "TEXT":
              return <GENERAL form={form} field={field} />;

            case "NUMBER":
              return <GENERAL form={form} field={field} />;

            case "EMAIL":
              return <GENERAL form={form} field={field} />;

            case "TEXTAREA":
              return <GENERAL form={form} field={field} />;

            case "DATE":
              return <GENERAL form={form} field={field} />;

            case "CHECKBOX":
              return <CHECKBOX form={form} field={field} />;

            case "RADIO":
              return <RADIO form={form} field={field} />;

            default:
              return null;
          }
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
