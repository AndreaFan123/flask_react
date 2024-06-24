// Vite env: https://vitejs.dev/guide/env-and-mode

import { useState, useEffect } from "react";

import "./App.css";

type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
}[];

function App() {
  const [contacts, setContacts] = useState<ContactType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const CONTACTS = import.meta.env.VITE_GET_CONTACTS as string;

  async function fetchContacts() {
    try {
      setIsLoading(true);
      const res = await fetch(CONTACTS);

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
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
