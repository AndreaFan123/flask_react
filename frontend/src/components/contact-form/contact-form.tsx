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
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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

type ContactFormType = {
  type: string;
  updateContact?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  deleteContact?: {
    id: number;
  };
};

function ContactForm({ type, updateContact, deleteContact }: ContactFormType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: type === "create" ? "" : updateContact?.firstName,
      lastName: type === "create" ? "" : updateContact?.lastName,
      email: type === "create" ? "" : updateContact?.email,
    },
  });
  const BASEURL = import.meta.env.VITE_BASE_URL as string;
  const CREATE_CONTACT = import.meta.env.VITE_CREATE_CONTACT as string;
  const UPDATE_CONTACT = import.meta.env.VITE_UPDATE_CONTACT as string;
  const DELETE_CONTACT = import.meta.env.VITE_DELETE_CONTACT as string;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url =
      type === "create"
        ? BASEURL + CREATE_CONTACT
        : BASEURL + UPDATE_CONTACT + `/${updateContact?.id}`;

    const options = {
      method: type === "create" ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      const res = await fetch(url, options);
      if (res.status !== 200 && res.status !== 201) {
        const data = await res.json();
        alert(data.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  async function onDelete() {
    const url = BASEURL + DELETE_CONTACT + `/${deleteContact?.id}`;

    try {
      const res = await fetch(url, { method: "DELETE" });
      if (res.status === 200) {
        return;
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }

    console.log("Contact deleted");
  }

  const deleteConfirmDialog = (
    <DialogHeader>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this contact?
      </DialogDescription>
      <div className="flex justify-end gap-3">
        <Button onClick={() => console.log("No")}>No</Button>
        <Button type="submit" onClick={onDelete}>
          Yes
        </Button>
      </div>
    </DialogHeader>
  );

  const createContactDialog = (
    <>
      <DialogHeader>
        <DialogTitle>Create Contact</DialogTitle>
        <DialogDescription>Create your contacts</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter First Name" {...field} />
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
                  <Input placeholder="Enter Last Name" {...field} />
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
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Contact</Button>
        </form>
      </Form>
    </>
  );

  const updateContactDialog = (
    <>
      <DialogHeader>
        <DialogTitle>Update Contact</DialogTitle>
        <DialogDescription>Update your contacts</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Update First Name" {...field} />
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
                  <Input placeholder="Update Last Name" {...field} />
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
                  <Input placeholder="Update Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Contact</Button>
        </form>
      </Form>
    </>
  );

  return (
    <>
      {type === "create" && createContactDialog}
      {type === "update" && updateContactDialog}
      {type === "delete" && deleteConfirmDialog}
    </>
  );
}

export default ContactForm;
