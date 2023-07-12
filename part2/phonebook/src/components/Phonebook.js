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

export default Phonebook;
