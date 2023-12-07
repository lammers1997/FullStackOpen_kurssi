import { useState } from 'react'



const Statistics = (props) => {
  const allFeedback = props.good + props.bad + props.neutral
  const average = (props.good * 1 + props.bad * (-1)) / allFeedback
  const positive = props.good / allFeedback * 100
  if (allFeedback > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />

            <StatisticLine text="all" value={allFeedback} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={`${positive}%`} />
          </tbody>
        </table>


      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
}
const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text} 

      </td>
      <td>
      {props.value}
      </td>

    </tr>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text='Good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='Bad' />

      </div>
      <Statistics good={good}
        bad={bad}
        neutral={neutral} />

    </div>
  )
}

export default App