const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json())
app.use(morgan("tiny"))

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

app.post("/api/persons", (request, response) => {
  const name = request.body.name;
  const number = request.body.number;
  if(name === undefined || number === undefined) {
    return response.status(400).send({ error: "name or number missing" });
  }  
  const alreadyPresent = persons.some(person=>person.name===name);
  if(alreadyPresent) {
    return response.status(400).send({ error: "name must be unique" });
  }
  const newPerson = {
    id: String(Math.round(Math.random() * 100000)),
    name: name,
    number: number 
  }
  persons.push(newPerson)
  response.json(newPerson)
})

const PORT = 3000;
app.listen(PORT);
console.log("server running on port", PORT);
