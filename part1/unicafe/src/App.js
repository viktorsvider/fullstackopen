import { useState } from "react";

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
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

  if (good || neutral || bad) {
    return (
      <div>
        <StatisticLine text="good" stat={good}></StatisticLine>
        <StatisticLine text="neutral" stat={neutral}></StatisticLine>
        <StatisticLine text="bad" stat={bad}></StatisticLine>
        <StatisticLine text="all" stat={all}></StatisticLine>
        <StatisticLine text="average" stat={average}></StatisticLine>
        <StatisticLine
          text="positive"
          stat={positive * 100 + "%"}
        ></StatisticLine>
      </div>
    );
  }
  return <p>No feedback given</p>;
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
      <Header text="StatisticLine"></Header>
      <SummaryStatistics
        good={good}
        neutral={neutral}
        bad={bad}
      ></SummaryStatistics>
    </div>
  );
};

export default App;
