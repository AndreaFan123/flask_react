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
import { Button } from "../ui/button";

function ContactTable({ contacts }: { contacts: ContactType[] }) {
  return (
    <section className="w-[60%]">
      <h1 className="text-3xl font-sans font-bold text-indigo-800 mb-3">
        Contact Book
      </h1>
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
            {contacts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="text-center">
                  <Button className="mr-2">Update</Button>
                  <Button>Delete</Button>
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
