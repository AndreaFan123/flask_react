// Vite env: https://vitejs.dev/guide/env-and-mode

import { useState, useEffect } from "react";
import ContactTable from "./components/contact-table/contact-table";
import ContactForm from "./components/contact-form/contact-form";

export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
};

function App() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const GET_CONTACTS = import.meta.env.VITE_GET_CONTACTS as string;

  async function fetchContacts() {
    try {
      setIsLoading(true);
      const res = await fetch(GET_CONTACTS);

      if (res.status === 200) {
        const data = await res.json();
        setContacts(data.contacts);
        setIsLoading(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex w-full max-w-[1400px] mx-auto gap-5 items-baseline">
      {isLoading ? <span>Loading</span> : <ContactTable contacts={contacts} />}
      <ContactForm />
    </div>
  );
}

export default App;
