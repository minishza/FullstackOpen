
const Header = ({courseHeader}) => {
    return (
        <h1>{courseHeader["name"]}</h1>
    )
}

const Content = ({content}) => {
    return (
        <ul>
            {
                content["parts"].map((e, index) => <Part key={index} name={e.name} exercise={e.exercises} />)
            }
        </ul>
    )
}

const Part = ({name, exercise}) => {
    return (
        <li>
            {name} {exercise}
        </li>
    )
}

const Total = ({exercises}) => {
    return (
        <p>Number of exercises {exercises["parts"].map(e => e["exercises"]).reduce(
            (exercise, totalExercises) => exercise + totalExercises
        )}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <>
            <Header courseHeader={course} />
            <Content content={course} />
            <Total exercises={course} />
        </>
    )
}

export default App