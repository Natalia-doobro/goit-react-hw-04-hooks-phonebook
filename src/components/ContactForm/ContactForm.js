import { useState } from "react";
import shortid from "shortid";
import s from "./ContactForm.module.css";

function ContactForm({ onSubmit, masContact }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const accessName = masContact.find((el) => el.name === name);

    if (accessName) {
      alert(`${name} is already in contacts`);
    } else {
      const obg = {
        name: name,
        number: number,
      };
      onSubmit(obg);
    }

    reset();
  };

  function reset() {
    setName("");
    setNumber("");
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label htmlFor={nameInputId} className={s.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          id={nameInputId}
          className={s.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={handleChange}
        />
      </label>

      <label htmlFor={numberInputId} className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          id={numberInputId}
          className={s.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={handleChange}
        />
      </label>

      <button type="submit" className={s.button}>
        Add Contact
      </button>
    </form>
  );
}
export default ContactForm;
