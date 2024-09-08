import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      {text} {value} <br />
    </>
  );
};

const Statistics = ({ good, neutral, bad, all, positive, average }) => {
  if (all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={all} />
        <StatisticsLine text={"average"} value={average} />
        <StatisticsLine text={"positive"} value={`${positive} %`} />
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const updateStats = () => {
    setAll(all + 1);

    if (all > 0) {
      setAverage((good - bad) / all);
    } else {
      setAverage(0);
    }

    if (all > 0) {
      setPositive((good * 100) / all);
    } else {
      setPositive(0);
    }
  };

  const handleGood = () => {
    setGood(good + 1);
    updateStats();
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    updateStats();
  };

  const handleBad = () => {
    setBad(bad + 1);
    updateStats();
  };

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header text={"statistics"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
