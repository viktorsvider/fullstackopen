import phonebookService from "../services/phonebook";

const confirmDeletion = (id, name) => {
  if (window.confirm(`Do you want to delete ${name}?`)) {
    phonebookService
      .delete(id)
      .then(() => {
        alert(`deleted ${name}`);
      })
      .catch((error) => {
        alert(`failed to delete ${name}`);
        console.log(error);
      });
  }
};

const Persons = ({ persons, filter }) => {
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
