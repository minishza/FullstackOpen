import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const StatisticLine = ({title, value}) => {

    return (
        <tr>
            <td>{title}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const average = () => {
        return (good + neutral + bad)/3
    }
    const total = () => {
        return good + neutral + bad
    }
    const positive = () => {
        return ((good/(neutral + bad + good)) * 100) + "%"
    }

    return (
        <>
            {total() > 0 ? (
                <table>
                    <tbody>
                    <StatisticLine title={"Good"} value={good} />
                    <StatisticLine title={"Neutral"} value={neutral} />
                    <StatisticLine title={"Bad"} value={bad} />
                    <StatisticLine title={"Total"} value={total()} />
                    <StatisticLine title={"Average"} value={average()} />
                    <StatisticLine title={"Positive"} value={positive()} />
                    </tbody>
                </table>
            ): <p>No feedback given</p>}
        </>
    )

}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <Header title={"Feedback"}/>
            <button onClick={() => setGood(good + 1)}>Good</button>
            <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
            <button onClick={() => setBad(bad + 1)}>Bad</button>
            <Header title={"Statistics"}/>
            <Statistics bad={bad} good={good} neutral={neutral} />
        </>
    )
}

export default App