const express = require("express");
const app = express();

const data = [
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
    response.json(data)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    console.log(id)
    const person = data.filter(person=>person.id===id)
    if(person) {response.json(person)}
    else{response.status(404).end()}
})

app.get("/api/info", (request, response) => {
    const info = `<p>Phonebook has info about ${data.length} people</p>` + new Date().toString();
    response.send(info)
})

const PORT = 3000;
app.listen(PORT);
console.log("server running on port", PORT);
