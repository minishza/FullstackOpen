import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [phonebook, setPhonebook] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                console.log("FETCHED PHONEBOOK: ", response.data);
                setPhonebook(response.data)
            })


    }, [])

    return <>{phonebook.map(contact => <div key={contact.id} >{contact.name} {contact.number}</div>)}</>
}

export default App
