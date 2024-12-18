require("dotenv").config();
const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(
    "\n:method :url :status :res[content-length] - :response-time :post-body\n"
  )
);
morgan.token("post-body", (request, response) => {
  if (request.method === "POST") return JSON.stringify(request.body);
});

let persons = [];

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    // console.error(" > Handling CastError", error.name);
    response.status(500).send({ error: "malformatted id" });
  } else {
    response.status(500).end();
    // console.error(" > Handling other error", error.name);
  }
  next(error);
};

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((person) => response.json(person))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      console.log(JSON.stringify(persons));
      const info =
        `<p>Phonebook has info about ${persons.length} people</p>` +
        new Date().toString();
      response.send(info);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        console.log(result);
        response.status(204).end();
      } else {
        response.status(404).send({ error: "Document not found" });
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (request, response, next) => {
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
    name: name,
    number: number,
  };
  Person.create(newPerson)
    .then((person) => response.json(person))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;
  if (body.number === undefined) {
    return response.status(400).send({ error: "number missing" });
  }
  const updatedPerson = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(id, updatedPerson, {new:true})
    .then((person) => response.json(person))
    .catch((error) => next(error));
})

app.use(unknownEndpoint);
// ensure to be loaded after all routes and other middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
