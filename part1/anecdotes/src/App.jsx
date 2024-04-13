import { useState } from 'react'

const Anecdote = ({anecdote, points}) => {
    return (
        <h2 style={{height: "70px"}}>
            {anecdote}
            <br></br>
            {points > 0 ? <div>has {points} votes</div> : <div></div>}
        </h2>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    const [points, setPoints] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]);

    const [selected, setSelected] = useState(0)
    const [mostVoted, setMostVoted] = useState(0)

    return <>
        <h1>
            Anecdote of the day
        </h1>
        <Anecdote anecdote={anecdotes[selected]} points={points[selected]}/>
        <div>
            <button onClick={() => {
                const copy = [...points]
                copy[selected] += 1
                setPoints(copy)

                const sorted = points.toSorted((a, b) => a - b).toReversed()
                setMostVoted(points.indexOf(sorted[0]))
            }}>
                Vote
            </button>
            <button
                onClick={() => {
                    setSelected(Math.floor(Math.random() * anecdotes.length))
                }}
            >Next Anecdote
            </button>
        </div>
        <h1>
            Anecdote with most votes
        </h1>
        <Anecdote anecdote={anecdotes[mostVoted]} points={points[mostVoted]}/>
    </>
}

export default App