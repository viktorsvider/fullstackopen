import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    if (persons.find((element) => element.name === newPerson.name)) {
      alert(`${newPerson.name} already added to the phonebook`);
    } else {
      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
      setNewName("");
    }
  };

  const handleNameChange = (event) => {
    console.log("change name to", event.target.value);
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
      <div>
        {persons.map((person) => (
          <div key={person.name}> {person.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
