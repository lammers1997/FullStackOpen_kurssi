import { useState } from 'react'

//Button component
const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

//main app
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  //state for selected anecdote
  const [selected, setSelected] = useState(0)
  // state for anecdotes' points
  const [points, setPoints] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  })
  //State for updating most voted anecdote
  const [mostVoted, setMostVoted] = useState(0)

  /** function for getting what anecdotes have the most votes
   * 
   * @param {*} newPoints is the updated points pass to this function to avoid delay appearing 
   * in the points state
   */
  const getMostVoted = (newPoints) => {
    const maxVotes = Math.max(...Object.values(newPoints));
    const mostVotedAnecdote = Object.keys(newPoints).find(key => newPoints[key] === maxVotes);
    setMostVoted(mostVotedAnecdote);
  }
  //Function for randomly selecting one anecdote in the list
  const randomNmbr = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  // Function for handling vote button click
  const handleVote = () => {
    const newPoints = {
      ...points,
    }
    newPoints[selected] += 1
    setPoints(newPoints)
    getMostVoted(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} has {points[selected]} votes
      </p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={randomNmbr} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[mostVoted]} has {points[mostVoted]} votes
      </p>

    </div>
  )
}

export default App