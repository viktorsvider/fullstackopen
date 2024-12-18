require("dotenv").config();
const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");
// const cors = require('cors')
const app = express();

// app.use(cors())
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time :post-body"
  )
);
morgan.token("post-body", (request, ressponse) => {
  if (request.method === "POST") return JSON.stringify(request.body);
});

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
  Person.find({})
    .then((person) => response.json(person))
    .catch((error) => console.log(error.message));
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  // console.log(id);
  // const personWithId = persons.filter((person) => person.id === id);
  // if (personWithId) {
  //    response.json(personWithId);
  // } else {
  //    response.status(404).end()
  // }
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({error:"malformatted id"});
    });
});

app.get("/api/info", (request, response) => {
  Person.find({})
    .then((persons) => {
      console.log(JSON.stringify(persons));
      const info =
        `<p>Phonebook has info about ${persons.length} people</p>` +
        new Date().toString();
      response.send(info);
    })
    .catch((error) => console.log(error.message));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  // const index = persons.findIndex((person) => person.id === id);
  // if (index !== -1) {
  //   persons.splice(index, 1);
  //   response.status(204).end();
  // } else {
  //   response.status(404).end();
  // }
  Person.findByIdAndDelete(id)
    .then(result => {
      if(result){
        console.log(result)
        response.status(204).end()
      } else {
        response.status(404).send({error: "Document not found"})
      }
    })
    .catch(error => {
      response.status(500).send({error: "Malformatted id"})
      console.log(error)
    })
});

app.post("/api/persons", (request, response) => {
  const name = request.body.name;
  const number = request.body.number;
  if (name === undefined || number === undefined) {
    return response.status(400).send({ error: "name or number missing" });
  }
  const alreadyPresent = persons.some((person) => person.name === name);
  if (alreadyPresent) {
    return response.status(400).send({ error: "name must be unique" });
  }
  const newPerson = {
    // id: String(Math.round(Math.random() * 100000)),
    name: name,
    number: number,
  };
  Person.create(newPerson)
    .then((person) => response.json(person))
    .catch((error) => console.log(error.message));
  // persons.push(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
