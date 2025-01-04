import {Person} from "./Person.jsx";

export const Content = ({persons}) => {

    return (
        <>
            {persons.map((person) => (
                <Person key={person.id} data={person} />
            ))}
        </>
    )
}