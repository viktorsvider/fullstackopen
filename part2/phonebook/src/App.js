import { useState, useEffect } from "react";
import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import phonebookService from "./services/phonebook";
import "./App.css";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phonebookService.getAll().then((data) => setPersons(data));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilterEntry] = useState("");
  const [newNotificationMessage, setNewNotificationMessage] = useState(null);

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

  const updateNotification = (message, delay) => {
    setNewNotificationMessage(message);
    setTimeout(() => {
      setNewNotificationMessage(null);
    }, delay);
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
      updateNotification(`Added ${personObject.name} to phonebook`, 5000);
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
        updateNotification(
          `Updated ${personObject.name} number to ${personObject.number}`,
          5000
        );
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDeletion = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}???`)) {
      phonebookService
        .deleteObject(person.id)
        .then(() => {
          const updatedPersons = persons.filter((p1) => p1 !== person);
          setPersons(updatedPersons);
          updateNotification(`Deleted ${person.name} from phonebook`, 5000);
        })
        .catch((error) => {
          console.error("Error deleting:", error);
          updateNotification(
            `Error deleting ${person.name}: ${error.message}`,
            5000
          );
        });
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
      <Notification message={newNotificationMessage}></Notification>
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
