const Phonebook = ({ persons, filter, handleDeletion }) => {
  const filterLower = filter.toLowerCase();
  if (filter === "") {
    return persons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDeletion(person)}>delete</button>
      </div>
    ));
  } else {
    return persons
      .filter((person) => person.name.toLowerCase().includes(filterLower))
      .map((filteredPerson) => (
        <div key={filteredPerson.name}>
          {filteredPerson.name} {filteredPerson.number}
          <button onClick={() => handleDeletion(filteredPerson)}>delete</button>
        </div>
      ));
  }
};

export default Phonebook;
