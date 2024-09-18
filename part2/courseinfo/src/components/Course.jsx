const Header = ({ course }) => {
  return <h1>{course}</h1>;
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
      {course.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </>
  );
};

const Total = ({ course }) => {
  const total = course.reduce((acum, part) => {
    return acum + part.exercises;
  }, 0);
  return <b>total of {total} exercises</b>;
};

export default Course;
