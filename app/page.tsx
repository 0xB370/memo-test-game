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

  const getRetries = () => {
    const gameState = localStorage.getItem('gameState');
    if (gameState) {
      const parsedGameState = JSON.parse(gameState);
      return {
        natureRetries: parsedGameState.nature.retryCount,
        animalsRetries: parsedGameState.animals.retryCount,
        foodRetries: parsedGameState.food.retryCount
      };
    }
    return {
      natureRetries: 0,
      animalsRetries: 0,
      foodRetries: 0,
    };
  }

  const { loading, error, data } = useQuery(GET_HIGHEST_SCORES);

  if (loading) {
    return <div className='container'><p>Loading...</p></div>;
  }

  if (error) {
    return <div className='container'><p>Error: {error.message}</p></div>;
  }

  const memoTests = data.memoTests;
  
  const fullRetries = getRetries();
  const highestScores = getHighestScores();

  const parsedMemoTests = memoTests.map(element => {
    let highestScore = 0;
    let retryCount = 0;
    switch (element.name) {
      case 'Nature':
        highestScore = highestScores.natureScore;
        retryCount = fullRetries.natureRetries;
        break;
      case 'Animals':
        highestScore = highestScores.animalsScore;
        retryCount = fullRetries.animalsRetries;
        break;
      case 'Food':
        highestScore = highestScores.foodScore;
        retryCount = fullRetries.foodRetries;
        break;
    }
    const modifiedElement = {
      ...element,
      highestScore,
      retryCount
    };
    return modifiedElement;
  });
  
  
  return (
    <div className='container'>
      <h1 className="title">Memory Game</h1>
      <ul>
        {parsedMemoTests.map((memoTest) => (
          <li key={memoTest.id}>
            <p>{memoTest.name}</p>
            <p>Highest Score: {memoTest.highestScore}%</p>
            <Link legacyBehavior href={`/game?category=${memoTest.name.toLowerCase()}&id=${memoTest.id}`}>
              {memoTest.retryCount > 0 ? 
              (<button className="back-button">Continue</button>)
              :
              (<button className="back-button">Start</button>)
              }
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoTestGamePage;
