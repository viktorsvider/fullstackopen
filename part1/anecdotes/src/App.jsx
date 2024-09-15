import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

function getRandomInt(min, max) {
  // min inclusive, max exclusive
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const anecdotesNumber = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotesNumber).fill(0));

  const handleNextAnecdote = () => {
    setSelected(getRandomInt(0, anecdotesNumber));
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <Button handleClick={handleVote} text={"vote"}></Button>
      <Button handleClick={handleNextAnecdote} text={"next anecdote"}></Button>
    </div>
  );
};

export default App;
