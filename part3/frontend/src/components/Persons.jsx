import phonebookService from "../services/phonebook";

const Persons = ({ persons, filter, confirmDeletion }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
            <button
              id={person.id}
              name={person.name}
              onClick={() => {
                confirmDeletion(person.id, person.name);
              }}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
