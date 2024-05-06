import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [phonebook, setPhonebook] = useState([]);

    return <>
        <h1>Phonebook</h1>
        <div className="filter-input">
            <label>Filter by: </label>
            <input/>
        </div>

        <h2>Add a contact</h2>
        <div className="create-contact">
            <label>Name: <input/></label>
            <label>Number: <input/></label>
            <button type="submit" className="persist-contact">Add</button>
        </div>

        <h2>Contacts</h2>
        {phonebook.map(contact => <div key={contact.id}>{contact.name} {contact.number}</div>)}
    </>
}

export default App
