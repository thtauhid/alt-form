"use client";

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
import { useSubmitResponse } from "@/hooks";
import { FormField as FormFieldType } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SuccessPage from "./SuccessPage";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
                        <Input {...fieldx} required={field.required} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );

            case "RADIO":
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
                        <RadioGroup
                          onValueChange={fieldx.onChange}
                          required={field.required}
                        >
                          <div className="space-y-2">
                            {field.options.map((option) => (
                              <div
                                className="flex items-center space-x-2"
                                key={option}
                              >
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option}>{option}</Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
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
