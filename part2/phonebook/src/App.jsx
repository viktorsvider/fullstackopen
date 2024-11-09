import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => {
        console.log("promise fullified", response.data);
        setPersons(response.data);
      })
      .catch((error) => alert("failed to fetch persons", error));
  }, []);

  const confirmDeletion = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      phonebookService
        .delete(id)
        .then(() => {
          alert(`deleted ${name}`);
          setPersons(
            persons.filter((person) => person.id != id && person.name != name)
          );
        })
        .catch((error) => {
          alert(`failed to delete ${name}`);
          console.log(error);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { id: newName, name: newName, number: newNumber };
    const presentPerson = persons.find(
      (element) => element.name === newPerson.name
    );

    if (
      presentPerson &&
      window.confirm(
        `${presentPerson.name} already added to the phonebook, would you like to change it?`
      )
    ) {
      phonebookService
        .update(presentPerson.id, newPerson)
        .then(
          setPersons(
            persons.map((person) => {
              if (person.name === presentPerson.name) {
                return { ...person, number: newNumber };
              } else {
                return person;
              }
            })
          )
        )
        .catch((error) => console.log(error));
      console.log(presentPerson, "upd");
    } else if (newName.trim() === "") {
      alert("Name could not be void");
    } else if (newNumber.trim() === "") {
      alert("Number could not be void");
    } else if (presentPerson === undefined) {
      console.log(presentPerson, "post");
      const newPersons = persons.concat(newPerson);
      phonebookService
        .create(newPerson)
        .then((response) => {
          console.log("added", response);
          setNotification(`Succesfully added ${newPerson.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
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

      <Notification message={notification} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={newFilter}
        confirmDeletion={confirmDeletion}
      />
    </div>
  );
};

export default App;
