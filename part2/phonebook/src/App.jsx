import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => {
        console.log("promise fullified", response.data);
        setPersons(response.data);
      })
      .catch((error) => alert("failed to fetch persons", error));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.find((element) => element.name === newPerson.name)) {
      alert(`${newPerson.name} already added to the phonebook`);
    } else if (newName.trim() === "") {
      alert("Name could not be void");
    } else if (newNumber.trim() === "") {
      alert("Number could not be void");
    } else {
      const newPersons = persons.concat(newPerson);
      phonebookService
        .create(newPersons)
        .then((response) => console.log(response))
        .catch((error) => alert("failed to add new person on server", error));
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
