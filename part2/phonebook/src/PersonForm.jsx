import {useState} from "react";

export const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const changePerson = (e) => {
        e.preventDefault()

        const copy = persons.map(person => person.name).includes(newName)
        if (copy) {
            alert(`${newName} is already in use`)
        }else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <form>
            <div>
                name: <input value={newName}
                             onChange={(e) => setNewName(e.target.value)}/>
            </div>
            <div>
                number: <input value={newNumber}
                               onChange={(e) => setNewNumber(e.target.value)}/>
            </div>
            <div>
                <button type="submit" onClick={(e) => {changePerson(e)}}>add
                </button>
            </div>
        </form>
    )
}