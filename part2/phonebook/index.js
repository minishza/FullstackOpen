let phonebook = []

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.static('dist'))
app.use(cors());
app.use(express.json())

morgan.token('person', function (req, res) {
    const person = JSON.stringify(req.body)
    return `${person}`;
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


app.get("/api/persons", (req, res) => {
    res.json(phonebook);
})

app.get("/info", (req, res) => {
    res.send
    (`
        <p> Phonebook has info for ${phonebook.length} people </p>
        <p> ${new Date()} </p>
    `);
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const existingNote = phonebook.find(phonebook => phonebook.id === id);
    if (existingNote) {
        res.json(existingNote);
    }else {
        res.status(404).send("No such phonebook found!");
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const existingNote = phonebook.find(phonebook => phonebook.id === id)
    if (existingNote) {
        phonebook = phonebook.filter(phonebook => phonebook.id === id);
        res.status(200).send(` ${existingNote} was deleted`);
    }else {
        res.status(404).send("No such phonebook found!");
    }
})

app.post("/api/persons", (req, res) => {
    const person = req.body;
    const existingNote = phonebook.find(phonebook => phonebook.name === person.name);
    if (!existingNote && person.name && person.number) {
        phonebook = phonebook.concat({id: Math.floor(Math.random() * 141517896243), ...person});
        res.status(200).send(phonebook);
    }else {
        res.status(404).send("The phonebook must be unique");
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})