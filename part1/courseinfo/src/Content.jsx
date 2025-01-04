import {Part} from "./Part.jsx";

export const Content = ({ course }) => {
    return (
        <>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
        </>
    )
}