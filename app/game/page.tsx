'use client';

import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation, gql } from '@apollo/client';
import { updateNatureScore, updateAnimalsScore, updateFoodScore } from '../store/actions/updateScore';
import { updateGameState, updateImages, resetGameState } from '../store/actions/gameState';

const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const GET_MEMO_TESTS = gql`
  query MemoTest($id: ID!) {
    memoTest(id: $id) {
      id
      name
      images {
        id
        url
      }
    }
  }
`;

function Game() {
  const router = useRouter();
  const category = useSearchParams().get('category') || 'nature';
  const id = useSearchParams().get('id') || '1';
  const [fullGameState, setFullGameState] = useState(useSelector((state) => state.gameState));
  const [fullHighestScores, setFullHighestScores] = useState(useSelector((state) => state.updateScore));
  const [images, setImages] = useState(useSelector((state) => state.gameState[category].images));
  const [flippedCards, setFlippedCards] = useState(useSelector((state) => state.gameState[category].flippedCards));
  const [matchedCards, setMatchedCards] = useState(useSelector((state) => state.gameState[category].matchedCards));
  const [retryCount, setRetryCount] = useState(useSelector((state) => state.gameState[category].retryCount));
  const [score, setScore] = useState(useSelector((state) => state.gameState[category].score));
  const [isSessionEnded, setIsSessionEnded] = useState(useSelector((state) => state.gameState.isSessionEnded));
  const gameState = useSelector((state) => state.gameState[category]);
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_MEMO_TESTS, {
    variables: {
      id
    },
  });
  const initialState = {
    flippedCards: [],
    matchedCards: [],
    retryCount: 0,
    score: 0,
    isSessionEnded: false,
    images: [],
  };
  const [highestScore, setHighestScore] = useState(useSelector((state) => {
    if (category === 'nature') {
      return state.updateScore.natureScore;
    } else if (category === 'animals') {
      return state.updateScore.animalsScore;
    } else if (category === 'food') {
      return state.updateScore.foodScore;
    }
    return 0; 
  }));

  const storeSessionData = () => {
    const storedSessionData = localStorage.getItem('gameState');
    if (storedSessionData) {
      const parsedSessionData = JSON.parse(storedSessionData);
      localStorage.setItem('gameState', JSON.stringify({
        ...parsedSessionData,
        [category]: gameState
      }));
    } else {
      localStorage.setItem('gameState', JSON.stringify({
        ...fullGameState,
        [category]: gameState
      }));
    }
  }

  const resetSessionData = () => {
    dispatch(updateGameState(category, initialState));
    const storedSessionData = localStorage.getItem('gameState');
    if (storedSessionData) {
      const parsedSessionData = JSON.parse(storedSessionData);
      localStorage.setItem('gameState', JSON.stringify({
        ...parsedSessionData,
        [category]: {
          flippedCards: [],
          matchedCards: [],
          retryCount: 0,
          score: 0,
          isSessionEnded: false,
          images: [],
        }
      }));
    } else {
      localStorage.setItem('gameState', JSON.stringify({
        ...fullGameState,
        [category]: {
          flippedCards: [],
          matchedCards: [],
          retryCount: 0,
          score: 0,
          isSessionEnded: false,
          images: [],
        }
      }));
    }
  }

  const updateHighestScore = (score) => {
    if (category === 'nature') {
      dispatch(updateNatureScore(score));
    } else if (category === 'animals') {
      dispatch(updateAnimalsScore(score));
    } else if (category === 'food') {
      dispatch(updateFoodScore(score));
    }
    const storedHighestScores = localStorage.getItem('highestScores');
    const categoryScore = category + 'Score';
    if (storedHighestScores) {
      const parsedHighestScores = JSON.parse(storedHighestScores);
      localStorage.setItem('highestScores', JSON.stringify({
        ...parsedHighestScores,
        [categoryScore]: score
      }));
    } else {
      localStorage.setItem('highestScores', JSON.stringify({
        ...fullHighestScores,
        [categoryScore]: score
      }));
    }
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=15&query=${category}&client_id=${unsplashAccessKey}`
        );
        const data = await response.json();
        const imageUrls = data.map((image) => image.urls.regular);
        // Ordered images to test
        const imagesArr = imageUrls.flatMap((element) => [element, element]);
        // const imagesArr = shuffleArray(imageUrls.flatMap((element) => [element, element]));
        setImages(imagesArr);
        dispatch(updateImages(category, imagesArr ));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    // Retrieve the session data from Local Storage
    const sessionData = localStorage.getItem('gameState');
    if (sessionData) {
      const parsedSessionData = JSON.parse(sessionData);
      if (parsedSessionData[category].images.length > 0) {
        setFlippedCards(parsedSessionData[category].flippedCards);
        setMatchedCards(parsedSessionData[category].matchedCards);
        setRetryCount(parsedSessionData[category].retryCount);
        setScore(parsedSessionData[category].score);
        setIsSessionEnded(parsedSessionData[category].isSessionEnded);
        setImages(parsedSessionData[category].images);
        dispatch(updateImages(category, parsedSessionData[category].images ));
      } else {
        fetchImages();
      }
    }else {
      fetchImages();
    }
    dispatch(updateGameState(category, {
      flippedCards,
      matchedCards,
      retryCount,
      score,
      isSessionEnded,
    }));
    const storedSessionData = localStorage.getItem('gameState');
    if (storedSessionData) {
      const parsedSessionData = JSON.parse(storedSessionData);
      localStorage.setItem('gameState', JSON.stringify({
        ...parsedSessionData,
        [category]: gameState
      }));
    } else {
      localStorage.setItem('gameState', JSON.stringify({
        ...fullGameState,
        [category]: gameState
      }));
    }
  }, [category]);

  useEffect(() => {
    // Retrieve the full game state from Local Storage
    const storedGameState = localStorage.getItem('gameState');
    if (storedGameState) {
      const parsedGameState = JSON.parse(storedGameState);
      setFullGameState(parsedGameState);
    }
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (images[card1] === images[card2]) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, card1, card2]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
    }

    dispatch(updateGameState(category, {
      flippedCards,
      matchedCards,
      retryCount,
      score,
      isSessionEnded,
    }));
    localStorage.setItem('gameState', JSON.stringify({
      ...fullGameState,
      [category]: {
        ...fullGameState[category],
          flippedCards,
          matchedCards,
          retryCount,
          score,
          isSessionEnded,
      }
    }));

  }, [flippedCards, images]);

  const handleClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) {
      return;
    }
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);
    if (flippedCards.length === 1) {
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
      if (images[flippedCards[0]] === images[index]) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, flippedCards[0], index]);
        setFlippedCards([]);
        setRetryCount((prevRetryCount) => prevRetryCount + 1);

        if (matchedCards.length + 2 === images.length) {
          setIsSessionEnded(true);
          // The extra '* 100 / 100' is to round to 2 decimals places
          const sc = Math.round((matchedCards.length / retryCount) * 100 * 100) / 100;
          setScore(sc);
          if (sc > highestScore) {
            updateHighestScore(sc);
          }
          resetSessionData();
          // Dispatch action to save the state in Redux
          dispatch(resetGameState(category));
        }        
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      dispatch(updateGameState(category, {
        flippedCards,
        matchedCards,
        retryCount,
        score,
        isSessionEnded,
      }));
    }
    dispatch(updateGameState(category, {
      flippedCards,
      matchedCards,
      retryCount,
      score,
      isSessionEnded,
    }));
    storeSessionData();
  };

  const handleBackClick = () => {
    dispatch(updateGameState(category, {
      flippedCards,
      matchedCards,
      retryCount,
      score,
      isSessionEnded,
    }));
    storeSessionData();
  };

  const renderGrid = () => {
    const gridSize = 6;
    const rowSize = 5;
    const totalCards = gridSize * rowSize;

    return (
      <div className="card-container">
        {images.slice(0, totalCards).map((image, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedCards.includes(index);
          const cardClass = `card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

          return (
            <div
              key={index}
              className={cardClass}
              onClick={() => handleClick(index)}
            >
              <div className="card-back">{isFlipped || isMatched ? '' : index + 1}</div>
              {isFlipped || isMatched ? (
                <img src={image} alt={`Card ${index}`} className="card-front" />
              ) : (
                <div className="card-front"></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Memory Game</h1>
      {error ? (<p>Error: {error.message}</p>) :
      (images.length > 0 || loading )? (
        <>
          <p>Retries: {retryCount}</p>
          {renderGrid()}
          {isSessionEnded ? (
            <div className="score">
              <p>Session Ended</p>
              <p>Score: {score}%</p>
              <Link href="/">
                <button onClick={resetSessionData} className="return-home-button">Return to Home</button>
              </Link>
            </div>
          )
          :
          <Link href="/">
            <button className="back-button" onClick={handleBackClick}>Back</button>
          </Link>
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Game;
