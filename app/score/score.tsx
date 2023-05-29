import React from 'react';

interface ScoreProps {
  numberOfPairs: number;
  retries: number;
  onReturnHome: () => void;
}

const ScorePage: React.FC<ScoreProps> = ({ numberOfPairs, retries, onReturnHome }) => {
  const score = (numberOfPairs / retries) * 100;

  return (
    <div>
      <h1>Score</h1>
      <p>Number of Pairs: {numberOfPairs}</p>
      <p>Retries: {retries}</p>
      <p>Score: {score}</p>
      <button onClick={onReturnHome}>Return to Home</button>
    </div>
  );
};

export default ScorePage;
