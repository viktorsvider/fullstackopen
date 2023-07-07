import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const indexOfMax = (points) => {
    let max = 0;
    let indexMax = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i] > max) {
        indexMax = i;
        max = points[indexMax];
      }
    }
    return indexMax;
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const mostVoted = indexOfMax(points);

  const getNextAnecdote = () => {
    let current = selected;
    while (current === selected) {
      current = Math.floor(Math.random(0, 1) * anecdotes.length);
    }
    return current;
  };

  const vote = (index) => {
    let currentPoints = [...points];
    currentPoints[index] += 1;
    return currentPoints;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button
        onClick={() => {
          setPoints(vote(selected));
        }}
      >
        vote
      </button>
      <button
        onClick={() => {
          setSelected(getNextAnecdote());
        }}
      >
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  );
};

export default App;
