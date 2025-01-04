import {Header} from "./Header.jsx";
import {Statistics} from "./Statistics.jsx";
import {Content} from "./Content.jsx";

export const Course = ({ course }) => {
    return (
        <>
            <Header title={course.name} />
            <Content course={course} />
            <Statistics course={course} />
        </>
    )
}