const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((acum, part) => {
    return acum + part.exercises;
  }, 0);
  return <b>total of {total} exercises</b>;
};

export default Course;
