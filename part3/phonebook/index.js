const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  const personWithId = persons.filter((person) => person.id === id);
  if (personWithId) {
    response.json(personWithId);
  } else {
    response.status(404).end();
  }
});

app.get("/api/info", (request, response) => {
  const info =
    `<p>Phonebook has info about ${persons.length} people</p>` +
    new Date().toString();
  response.send(info);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const index = persons.findIndex(person => person.id === id);
  if (index !== -1) {
    persons.splice(index, 1)
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const PORT = 3000;
app.listen(PORT);
console.log("server running on port", PORT);
