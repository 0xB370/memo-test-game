'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const MemoTestGamePage: React.FC = () => {
  const dispatch = useDispatch();
  const highestNatureScore = useSelector((state) =>state.updateScore.natureScore);
  const highestAnimalScore = useSelector((state) => state.updateScore.animalsScore);
  const highestFoodScore = useSelector((state) => state.updateScore.foodScore);

  const getHighestScores = () => {
    const highestScores = localStorage.getItem('highestScores');
    if (highestScores) {
      const parsedHighestScores = JSON.parse(highestScores);
      return {
        natureScore: parsedHighestScores.natureScore,
        animalsScore: parsedHighestScores.animalsScore,
        foodScore: parsedHighestScores.foodScore,
      };
    }
    return {
      natureScore: 0,
      animalsScore: 0,
      foodScore: 0,
    };
    
    
  }

  const highestScores = getHighestScores();
  const highestNatureScoreDisp = highestScores.natureScore;
  const highestAnimalScoreDisp = highestScores.animalsScore;
  const highestFoodScoreDisp = highestScores.foodScore;

  const memoTests = [
    { id: 1, name: 'Nature', highestScore: highestNatureScoreDisp },
    { id: 2, name: 'Animals', highestScore: highestAnimalScoreDisp },
    { id: 3, name: 'Food', highestScore: highestFoodScoreDisp },
  ];

  return (
    <div>
      <h1>Memo Test Game</h1>
      <ul>
        {memoTests.map((memoTest) => (
          <li key={memoTest.id}>
            <Link legacyBehavior href={`/game?category=${memoTest.name.toLowerCase()}`}>
              <a>
                {memoTest.name} - Highest Score: {memoTest.highestScore}%
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoTestGamePage;
