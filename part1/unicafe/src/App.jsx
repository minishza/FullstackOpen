import { useState } from 'react'

const Statistics = ({good, neutral, bad, total}) => {

    return (
        <table>
            <tbody>
            <StatisticLine text={"Good"} value={good}/>
            <StatisticLine text={"Neutral"} value={neutral}/>
            <StatisticLine text={"Bad"} value={bad}/>
            <StatisticLine text={"All"} value={total}/>
            <StatisticLine text={"Average"} value={((good-bad)/total)}/>
            <StatisticLine text={"Positive"} value={good/total * 100} extra={"%"}/>
            </tbody>
        </table>
    )
}

const StatisticLine = (data) => {
    return (
        <tr>
            <td>{data.text}</td>
            <td>{data.value} {data.extra}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    return (
        <>
            <h1>Give Feedback</h1>
            <div style={{display: "flex", gap: "10px"}}>
                <button onClick={() => {
                    setGood(1 + good)
                    setTotal(1 + total)
                }}>
                    Good
                </button>
                <button onClick={() => {
                    setNeutral(neutral + 1)
                    setTotal(1 + total)
                }}>
                    Neutral
                </button>
                <button onClick={() => {
                    setBad(bad + 1)
                    setTotal(1 + total)
                }}>
                    Bad
                </button>
            </div>
            <h2>Statistics</h2>
            {good > 0 || bad > 0 || neutral > 0 ?
                <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
                :
                <h5>
                    No feedback given
                </h5>
            }
        </>
    )
}

export default App