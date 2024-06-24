import { ContactType } from "../../App";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import ContactForm from "../contact-form/contact-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

function ContactTable({ contacts }: { contacts: ContactType[] }) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl inline-block font-sans font-bold text-indigo-800 mb-3">
          Contact Book
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Contact</Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <ContactForm type="create" />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="border rounded-lg shadow-lg">
        <TableCaption>A list of your contact.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">First Name</TableHead>
            <TableHead className="text-left">Last Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {!contacts.length ? (
          <TableBody className="px-2">
            <TableRow className="text-lg text-gray-500 inline-block mt-2 p-2">
              <TableCell>No contact</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody className="px-2">
            {contacts.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mr-3">Update</Button>
                    </DialogTrigger>
                    <DialogContent className="w-full">
                      <ContactForm
                        type="update"
                        updateContact={{
                          id: item.id,
                          firstName: item.firstName,
                          lastName: item.lastName,
                          email: item.email,
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Delete</Button>
                    </DialogTrigger>
                    <DialogContent className="w-full ">
                      <ContactForm
                        type="delete"
                        deleteContact={{
                          id: item.id,
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </section>
  );
}

export default ContactTable;
