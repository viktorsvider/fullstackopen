const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  // just completed 2.3 with 2.2
  const sum = parts.reduce((partialSum, part) => partialSum + part.exercises, 0)
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id}></Part>
      ))}
      <p>
        <strong>total of {sum} exercises</strong>
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name}></Header>
      <Content parts={course.parts}></Content>
    </div>
  )
}

export default Course
