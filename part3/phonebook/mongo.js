const mongoose = require("mongoose");

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log(
    "Usage: node mongo.js [MONGO_PASSWORD] [PERSON_NAME] [PERSON_NUMBER] to add new entry"
  );
  console.log(
    "or: node mongo.js [MONGO_PASSWORD] to list all entries in database"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://viktor64y:${password}@cluster0.ahech.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} with number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:")
    result.forEach((person) => {
      console.log(person.name, person.number);
      mongoose.connection.close();
    });
  });
}