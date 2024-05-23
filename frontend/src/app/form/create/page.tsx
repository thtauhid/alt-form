"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { useCreateForm } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
});

export default function CreateForm() {
  const router = useRouter();
  const { mutate, data, isPending, isSuccess, isError } = useCreateForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: (data: any) => {
        toast.success("Form created successfully");
        router.push(`/form/${data.id}/edit`);
      },
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-b-[#3c2a4d]">
        <h1 className="text-3xl font-bold">Create Form</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Form Title"
                    {...field}
                    disabled={
                      form.formState.isSubmitting || isPending || isSuccess
                    }
                  />
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
                <FormLabel>Form Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Form Description"
                    {...field}
                    disabled={
                      form.formState.isSubmitting || isPending || isSuccess
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isPending || isSuccess}
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
