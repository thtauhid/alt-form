"use client";

import { FormField as FormFieldType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  fields: FormFieldType[];
  formId: string;
}

import { useForm } from "react-hook-form";
import { useState } from "react";
import SuccessPage from "./SuccessPage";
import { useSubmitResponse } from "@/hooks";

export default function FormPage(props: Props) {
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate } = useSubmitResponse(props.formId);

  const form = useForm();

  async function onSubmit(values: Record<string, string>) {
    try {
      console.log(values);
      const fields = Object.keys(values).map((key) => ({
        question: key,
        answer: values[key],
      }));

      console.log(fields);

      mutate({ response: fields });

      toast.success("Form submitted successfully");
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
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
              return (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={field.title}
                  render={({ field: fieldx }) => (
                    <FormItem>
                      <FormLabel>{field.title}</FormLabel>
                      <FormDescription>{field.description}</FormDescription>
                      <FormControl>
                        <Input {...fieldx} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );

            default:
              return null;
          }
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
