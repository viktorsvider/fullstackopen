const Header = props => {
  return <h1>{props.course}</h1>;
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
      {props.parts.map(element => (
        <>
          <Part part={element.name} exercises={element.exercises} />
        </>
      ))}
    </div>
  );
};

const Total = props => {
  const parts = props.parts;
  const total = parts.reduce((accumulator, object) => {
    return accumulator + object.exercises;
  }, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
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
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
