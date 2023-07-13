import { useState, useEffect } from "react";
import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
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
      setPersons(persons.concat(personObject));
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
