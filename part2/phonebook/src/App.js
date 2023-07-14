import { useState, useEffect } from "react";
import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    phonebookService.getAll().then((data) => setPersons(data));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilterEntry] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilterEntryChange = (event) => {
    setNewFilterEntry(event.target.value);
  };

  const isPersonPresent = (persons, person) => {
    for (const element of persons) {
      if (person.name === element.name) {
        return true;
      }
    }
    return false;
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (personObject.name === "" || personObject.number === "") {
      alert("Please input non-empty name and phone number");
      return;
    }

    if (!isPersonPresent(persons, personObject)) {
      phonebookService
        .create(personObject)
        .then(setPersons(persons.concat(personObject)));
    } else {
      alert(`${personObject.name} is already added to a phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={newFilter}
        handleNewFilterChange={handleNewFilterEntryChange}
      />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
