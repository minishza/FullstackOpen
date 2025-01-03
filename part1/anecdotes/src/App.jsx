import { useState } from 'react'

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

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState([
        0,0,0,0,0,0,0,0
    ])
    const [highest, setHighest] = useState(0)

    const highestVoted = () => {
        let high = 0
        for (let i = 0; i < votes.length; i++) {
            if (votes[i] > high) {
                high = i
            }
        }
        setHighest(high)
    }

    return (
        <div>
            <p>
                {anecdotes[selected]}
            </p>
            <p>This anecdote has {votes[selected]} votes</p>
            <button onClick={() => {
                const vote = [...votes]
                console.log(vote)
                vote[selected] += 1
                setVotes(vote)
                highestVoted()
            }}>vote</button>
            <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next</button>
            <h1>Most Voted Anecdote</h1>
            {highest === 0 ? <p>...</p> : <p>{anecdotes[highest]}</p>}
        </div>
    )
}

export default App