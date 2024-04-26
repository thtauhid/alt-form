import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormField as FormFieldType } from "@/types";
interface Props {
  form: UseFormReturn<FieldValues, any, undefined>;
  field: FormFieldType;
}
export default function RADIO(props: Props) {
  return (
    <FormField
      control={props.form.control}
      key={props.field.id}
      name={props.field.title}
      render={({ field: fieldx }) => (
        <FormItem>
          <FormLabel>{props.field.title}</FormLabel>
          <FormDescription>{props.field.description}</FormDescription>
          <FormControl>
            <RadioGroup
              onValueChange={fieldx.onChange}
              required={props.field.required}
            >
              <div className="space-y-2">
                {props.field.options.map((option) => (
                  <div className="flex items-center space-x-2" key={option}>
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
}
