"use client";
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
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});

export default function RegistrationPage() {
  const user = useUserStore((state) => ({
    setToken: state.setToken,
    setName: state.setName,
    setImage: state.setImage,
  }));

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    await axios
      .post("/api/auth/user", values)
      .then((response) => {
        console.log(response.data);
        const data = response.data;

        // TODO: Uncomment name and image when the API is updated
        // save token to local storage
        localStorage.setItem("token", data.data.token);
        // localStorage.setItem("name", data.data.name);
        // localStorage.setItem("image", data.data.image);

        // TODO: Uncomment name and image when the API is updated
        // set user store
        user.setToken(data.data.token);
        // user.setName(data.data.name);
        // user.setImage(data.data.image);

        router.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="p-8 border rounded-md">
      <h1 className="font-bold text-center text-3xl">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
