"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddField } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  formId: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters",
  }),
  type: z.enum(["TEXT", "EMAIL"]),
});

export default function AddField(props: Props) {
  const { mutate } = useAddField(props.formId);
  const [fieldTitle, setFieldTitle] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [fieldType, setFieldType] = useState("TEXT");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "TEXT",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="border-2 border-dashed p-4 bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TEXT">TEXT</SelectItem>
                      <SelectItem value="EMAIL">EMAIL</SelectItem>
                      <SelectItem value="NUMBER">NUMBER</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <PlusIcon className="mr-2" size={18} />
            Add Field
          </Button>
        </form>
      </Form>
      {/* <div>
        <Input
          type="text"
          className="w-full p-2 border"
          placeholder="Field Title"
          onChange={(e) => setFieldTitle(e.target.value)}
        />

        <Textarea
          className="w-full p-2 border mt-2"
          placeholder="Field Description"
          onChange={(e) => setFieldDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <select
          name="new_field"
          id=""
          className="w-full p-2 border"
          onChange={(e) => setFieldType(e.target.value)}
          defaultValue="TEXT"
        >
          <option value="TEXT">TEXT</option>
          <option value="EMAIL">EMAIL</option>
        </select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          className="w-full"
          onClick={() => {
            mutate({
              title: fieldTitle,
              type: fieldType,
              description: fieldDescription,
            });
          }}
        >
          <PlusIcon className="mr-2" size={18} />
          Add Field
        </Button>
      </div> */}
    </div>
  );
}
