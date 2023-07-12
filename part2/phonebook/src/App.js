import { useState } from "react";

const Phonebook = ({ persons, filter }) => {
  const filterLower = filter.toLowerCase();
  if (filter === "") {
    return persons.map((persona) => (
      <div key={persona.name}>
        {persona.name} {persona.number}
      </div>
    ));
  } else {
    return persons
      .filter((persona) => persona.name.toLowerCase().includes(filterLower))
      .map((filteredPersons) => (
        <div key={filteredPersons.name}>
          {filteredPersons.name} {filteredPersons.number}
        </div>
      ));
  }
};

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "035359090" },
  // ]);
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilterEntry] = useState("");

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

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilterEntryChange = (event) => {
    setNewFilterEntry(event.target.value);
  };
  // console.log("redraw...");
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={newFilter} onChange={handleNewFilterEntryChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
