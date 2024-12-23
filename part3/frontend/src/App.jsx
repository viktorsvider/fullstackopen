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
  const [notification, setNotification] = useState("");
  const [isError, setIsError] = useState(false);

  const hideNotification = () => {
    setNotification("");
    setIsError(false);
  };

  const showNotification = (message, timeout = 5000, isError = false) => {
    setNotification(message);
    setIsError(isError);
    setTimeout(() => {
      hideNotification();
    }, timeout);
  };

  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => {
        console.log("promise fulfilled", response.data);
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
            persons.filter((person) => person.id !== id && person.name !== name)
          );
        })
        .catch((error) => {
          showNotification(`Number of ${name} was already removed`, 5000, true);
          console.error(error);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
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
        .then(() => {
          setPersons(
            persons.map((person) =>
              person.name === presentPerson.name
                ? { ...person, number: newNumber }
                : person
            )
          );
          showNotification(
            `Successfully updated number of ${presentPerson.name}`,
            5000
          );
        })
        .catch((error) => {
          console.error("caught", error);
          showNotification(error.response.data.error, 5000);
        });
    } else if (newName.trim() === "") {
      alert("Name could not be void");
    } else if (newNumber.trim() === "") {
      alert("Number could not be void");
    } else if (presentPerson === undefined) {
      phonebookService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          showNotification(`Successfully added ${createdPerson.name}`, 5000);
        })
        .catch((error) => showNotification(error.response.data.error, 5000));
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

      <Notification message={notification} isError={isError} />

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
