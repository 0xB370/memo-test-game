'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, gql } from '@apollo/client';

const GET_HIGHEST_SCORES = gql`
  query {
    memoTests {
      id
      name
      images {
        id
        url
      }
    }
  }
`;

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

  const { loading, error, data } = useQuery(GET_HIGHEST_SCORES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const memoTests = data.memoTests;
  
  const highestScores = getHighestScores();
  const highestNatureScoreDisp = highestScores.natureScore;
  const highestAnimalScoreDisp = highestScores.animalsScore;
  const highestFoodScoreDisp = highestScores.foodScore;

  const parsedMemoTests = memoTests.map(element => {
    let highestScore = 0;
    switch (element.name) {
      case 'Nature':
        highestScore = highestNatureScoreDisp;
        break;
      case 'Animals':
        highestScore = highestAnimalScoreDisp;
        break;
      case 'Food':
        highestScore = highestFoodScoreDisp;
        break;
    }
    const modifiedElement = {
      ...element,
      highestScore: highestScore
    };
    return modifiedElement;
  });
  

  /*
  const memoTestsStorage = [
    { id: 1, name: 'Nature', highestScore: highestNatureScoreDisp },
    { id: 2, name: 'Animals', highestScore: highestAnimalScoreDisp },
    { id: 3, name: 'Food', highestScore: highestFoodScoreDisp },
  ];
  */
  
  return (
    <div>
      <h1>Memory Game</h1>
      <ul>
        {parsedMemoTests.map((memoTest) => (
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
