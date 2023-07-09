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
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id}></Part>
      ))}
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return <Course course={course} />
}

export default App
