const Header = ({courseHeader}) => {
    return (
        <h1>{courseHeader["name"]}</h1>
    )
}

const Content = ({content}) => {
    return (
        <ul>
            {
                content["parts"].map((e) => <Part key={e.id} name={e.name} exercise={e.exercises} />)
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

const CourseInformation = ({course}) => {

    return <>
        <Header courseHeader={course} />
        <Content content={course} />
        <Total exercises={course} />
    </>
}

export {
    CourseInformation,
    Header,
    Content,
    Total
}