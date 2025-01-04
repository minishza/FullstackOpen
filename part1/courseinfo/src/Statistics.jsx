
export const Statistics = ({course}) => {
    const parts = course.parts
    return (
        <b>
            total of {parts.reduce((tot, cur) => tot + cur.exercises, 0)} exercises
        </b>
    )
}