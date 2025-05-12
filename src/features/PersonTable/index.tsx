import { useEffect, useState } from "react";
import PersonRow from "../../components/PersonRow";
import styles from "./styles.module.css";
import { deleteContact, getAllContacts, searchContactByNameNumber } from "./PersonData";
import { Contact } from "../../types/contact";
import SearchBar from "../../components/SearchBar/SearchBar";

const PersonTable = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    getAllContacts()
      .then((data) => {
        console.log(data);
        setContactList(data);
      })
      .catch((err) => console.error("Erro ao carregar pessoa:", err));
  }, []);

  const handleSearch = (term: string) => {
    searchContactByNameNumber(term)
      .then((data) => setContactList(data))
      .catch((err) => console.error("Erro ao carregar pessoa:", err));
  };

  const handleRemoveContact = (id: number) => {
    deleteContact(id)
      .then(() => {
        setContactList((prev) => prev.filter((contact) => contact.id !== id));
      })
      .catch((err) => console.error("Erro ao remover pessoa:", err));
  };

  return (
    <>
      <SearchBar onSearch={(term) => handleSearch(term)} />
      <main className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <p className={styles.tableCell}>ID</p>
          <p className={styles.tableCell}>Nome</p>
          <p className={styles.tableCell}>Idade</p>
          <p className={styles.tableCell}>Ações</p>
        </div>

        {contactList.map((contact) => (
          <PersonRow removeContact={(id) => handleRemoveContact(id)} key={contact.id} contact={contact} />
        ))}
      </main>
    </>
  );
};

export default PersonTable;
