import { useState } from "react";

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  return (
    <div>
      {props.text} {props.stat}
    </div>
  );
};

const SummaryStatistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good * 1 - bad * 1) / all;
  const positive = all === 0 ? 0 : good / all;

  return (
    <div>
      <Statistics text="all" stat={all}></Statistics>
      <Statistics text="average" stat={average}></Statistics>
      <Statistics text="positive" stat={positive * 100 + "%"}></Statistics>
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
      <Statistics text="good" stat={good}></Statistics>
      <Statistics text="neutral" stat={neutral}></Statistics>
      <Statistics text="bad" stat={bad}></Statistics>
      <SummaryStatistics
        good={good}
        neutral={neutral}
        bad={bad}
      ></SummaryStatistics>
    </div>
  );
};

export default App;
