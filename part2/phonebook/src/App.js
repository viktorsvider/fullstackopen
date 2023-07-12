import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const isPersonPresent = (persons, person) => {
    const personJson = JSON.stringify(person);
    for (const element of persons) {
      if (JSON.stringify(element) === personJson) {
        return true;
      }
    }
    return false;
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };

    if (!isPersonPresent(persons, personObject)) {
      setPersons(persons.concat(personObject));
    } else {
      alert(`${personObject.name} is already added to a phonebook`);
    }

    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((persona) => (
        <div key={persona.name}>{persona.name}</div>
      ))}
    </div>
  );
};

export default App;
