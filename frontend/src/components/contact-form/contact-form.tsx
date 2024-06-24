import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
});

function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const POST_CONTACT = import.meta.env.VITE_CREATE_CONTACT as string;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      const res = await fetch(POST_CONTACT, options);
      if (res.status !== 200 && res.status !== 201) {
        const data = await res.json();
        console.log(data);
        alert(data.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[40%] border p-5 flex flex-col gap-3 rounded-md shadow-md"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter you first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter you last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter you email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ContactForm;
