import axios from "axios";

const uri = "http://localhost:3001/persons"

const fetchContacts = () => {
    axios
        .get(uri)
        .then(response => {
            console.log("FETCHED PHONEBOOK: ", response.data);
            return response.data
        }).catch(e => {
            console.log("ERROR WHEN FETCHING PHONEBOOK: ", e)
        })
}

const createContact = (contact) => {
    axios
        .post(uri, contact)
        .then(response => {
            console.log("CONTACT CREATED: ", response.data);
        }).catch(e => {
            console.log("ERROR WHEN CREATING A CONTACT: ", e, contact)
        })
}

const deleteContact = (id) => {
    axios
        .delete(uri, id)
        .then(response => {
            console.log("CONTACT CREATED: ", response.data);
        }).catch(e => {
        console.log("ERROR WHEN DELETE CONTACT: ", e)
    })
}

export default {
    fetchContacts,
    createContact,
    deleteContact
}