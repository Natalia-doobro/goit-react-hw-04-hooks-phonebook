import HookLocalStorage from "./hook/HookLocalStorage";
import shortid from "shortid";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Section from "./components/Section";

import s from "./App.module.css";

// { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
// { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
// { id: "id-3", name: "Eden Clements", number: "645-17-79" },
// { id: "id-4", name: "Annie Copeland", number: "227-91-26" },

function App() {
  const [contacts, setContacts] = HookLocalStorage("contacts", []);
  const [filter, setFilter] = HookLocalStorage("filter", "");

  const filterContacts = filterName();

  const addContact = (data) => {
    const { name, number } = data;

    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    setContacts((prevState) => {
      const elem = [contact, ...prevState];
      return elem;
    });
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  function filterName() {
    const normalizerForm = filter.toLowerCase();
    return contacts.filter((el) =>
      el.name.toLowerCase().includes(normalizerForm)
    );
  }

  const deliteContacts = (idCont) => {
    setContacts((prevState) => prevState.filter((cont) => cont.id !== idCont));
  };

  return (
    <div className={s.App}>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} masContact={contacts}></ContactForm>
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter}></Filter>
        <ContactList
          contact={filterContacts}
          onDelite={deliteContacts}
        ></ContactList>
      </Section>
    </div>
  );
}

export default App;
