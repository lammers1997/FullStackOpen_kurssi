const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </>
    )
  }
  
  const Total = ({ sum }) => {
    return (
      <p style={{ fontWeight: 'bold' }}>Number of exercises {sum}</p>
    )
  }
  
  const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((s, p) => s+ p.exercises, 0)
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={totalExercises} />
      </div>
    )
  }

  export default Course