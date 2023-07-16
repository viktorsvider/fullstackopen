import { useState, useEffect } from "react";
import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
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
    const maxId =
      persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;

    const personObject = {
      name: newName,
      number: newNumber,
      id: maxId + 1,
    };

    if (personObject.name === "") {
      alert("Please input non-empty name");
      return;
    }

    if (!isPersonPresent(persons, personObject)) {
      phonebookService
        .create(personObject)
        .then(setPersons(persons.concat(personObject)));
    } else {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, would you like
         to update old number?`
        )
      ) {
        const index = persons.findIndex((e) => e.name === personObject.name);

        if (index === undefined || index < 0 || index > persons.length - 1) {
          throw Error("INVALID INDEX");
        }

        personObject.id = persons[index].id;

        phonebookService
          .update(personObject.id, personObject)
          .catch((error) => console.log(error));

        setPersons([
          ...persons.slice(0, index),
          personObject,
          ...persons.slice(index + 1, persons.length),
        ]);
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDeletion = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}???`)) {
      const result = persons.filter((p1) => p1 !== person);
      setPersons(result);
      phonebookService.deleteObject(person.id);
    }
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
      <Phonebook
        persons={persons}
        filter={newFilter}
        handleDeletion={handleDeletion}
      />
    </div>
  );
};

export default App;
