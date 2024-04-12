"use client";

import { FormField as FormFieldType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

export default function FormPage(props: Props) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm();

  async function onSubmit(values: Record<string, string>) {
    try {
      const fields = Object.keys(values).map((key) => ({
        id: key,
        value: values[key],
      }));

      const form_data = {
        form_id: props.formId,
        fields,
      };

      await fetch("http://localhost:4000/submissions/", {
        method: "POST",
        body: JSON.stringify(form_data),
      });

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
            case "text":
              return (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={field.id}
                  render={({ field: fieldx }) => (
                    <FormItem>
                      <FormLabel>{field.name}</FormLabel>
                      <FormControl>
                        <Input {...fieldx} />
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
