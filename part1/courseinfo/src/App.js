const Header = props => {
  return <h1>{props.course.name}</h1>;
};

const Part = props => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = props => {
  return (
    <div>
      {props.course.parts.map(element => (
        <>
          <Part part={element.name} exercises={element.exercises} />
        </>
      ))}
    </div>
  );
};

const Total = props => {
  const parts = props.course.parts;
  const total = parts.reduce((accumulator, object) => {
    return accumulator + object.exercises;
  }, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
