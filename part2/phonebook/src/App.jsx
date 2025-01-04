import { useState } from 'react'
import {Person} from "./Person.jsx";
import {Header} from "./Header.jsx";
import {Content} from "./Content.jsx";
import {PersonForm} from "./PersonForm.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    return (
        <>
            <Header title={"Phonebook"} />
            <PersonForm persons={persons} setPersons={setPersons} />
            <Header title={"Numbers"} />
            <Content persons={persons} />
        </>
    )
}

export default App