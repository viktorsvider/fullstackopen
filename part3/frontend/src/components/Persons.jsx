import phonebookService from "../services/phonebook";

const Persons = ({ persons, filter, confirmDeletion }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.includes(filter))
        .map(({ id, name, number }) => (
          <div key={id}>
            {name} {number}
            <button
              id={id}
              name={name}
              onClick={() => {
                confirmDeletion(id, name);
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
