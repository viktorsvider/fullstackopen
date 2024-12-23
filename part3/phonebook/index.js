require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const app = express();

//app.use(express.static("dist"));
app.use(express.json());

morgan.token("separator", () => "-----------------------------------------------------------------\n");
morgan.token("post-body", (request) => {
  if (request.method === "POST") return `${JSON.stringify(request.body)}`;
});
app.use(
  morgan(
    ":separator  > :method :url | HTTP code :status | :res[content-length] bytes | :response-time ms | :post-body"
  )
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message});
  }
  next(error);
};

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/api/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const info =
        `<p>Phonebook has info about ${persons.length} people</p>` +
        new Date().toString();
      response.send(info);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).send({ error: "Document not found" });
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).send({ error: "name or number missing" });
  }

  Person.findOne({ name })
    .then((existingPerson) => {
      if (existingPerson) {
        return response.status(400).send({ error: "name must be unique" });
      }

      const newPerson = { name, number };
      Person.create(newPerson)
        .then((person) => {response.json(person)})
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  if (!number) {
    return response.status(400).send({ error: "number missing" });
  }
  const updatedPerson = { name, number };
  Person.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((person) => response.json(person))
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
