const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default Persons;
