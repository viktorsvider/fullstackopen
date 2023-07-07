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

const SummaryStats = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good * 1 - bad * 1) / all;
  const positive = all === 0 ? 0 : good / all;

  return (
    <div>
      <Stats text="all" stat={all}></Stats>
      <Stats text="average" stat={average}></Stats>
      <Stats text="positive" stat={positive * 100 + "%"}></Stats>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback"></Header>
      <Button text="good" handleClick={incrementGood}></Button>
      <Button text="neutral" handleClick={incrementNeutral}></Button>
      <Button text="bad" handleClick={incrementBad}></Button>
      <Header text="statistics"></Header>
      <Stats text="good" stat={good}></Stats>
      <Stats text="neutral" stat={neutral}></Stats>
      <Stats text="bad" stat={bad}></Stats>
      <SummaryStats good={good} neutral={neutral} bad={bad}></SummaryStats>
    </div>
  );
};

export default App;
