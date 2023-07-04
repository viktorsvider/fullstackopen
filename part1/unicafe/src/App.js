import { useState } from "react";

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Stats = (props) => {
  return (
    <div>
      {props.text} {props.stat}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback"></Header>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <Header text="statistics"></Header>
      <Stats text="good" stat={good}></Stats>
      <Stats text="neutral" stat={neutral}></Stats>
      <Stats text="bad" stat={bad}></Stats>
    </div>
  );
};

export default App;
