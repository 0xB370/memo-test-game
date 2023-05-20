'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function Game() {
  const [clientRendered, setClientRendered] = useState(false);
  const [images, setImages] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [isSessionEnded, setIsSessionEnded] = useState(false);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  

  useEffect(() => {
    // Fetch or generate the array of 30 image URLs
    // Replace this with your own logic to fetch or generate the URLs
    const fetchImages = async () => {
      /*
      const response = await fetch('https://api.api-ninjas.com/v1/randomimage?category=nature');
      const data = await response.json();
      setImages(data.images);
      */
      /*
      const imageArr = [
        'https://fastly.picsum.photos/id/996/200/200.jpg?hmac=nRtkfqKyD3p2uHiFO5LmGt31UcH3NKWg80H5yUkZ8_k',
        'https://fastly.picsum.photos/id/818/200/200.jpg?hmac=gfhJZngz3JDsSmE1obNFY5OeAQBVsJLED2VkwuGsC-o',
        'https://fastly.picsum.photos/id/852/200/200.jpg?hmac=4UHLpiS9j3YDnvq-w-MqnP5-ymiyvMs6BNV5ukoTRrI',
        'https://fastly.picsum.photos/id/572/200/200.jpg?hmac=YFsNUCQc2Dfz_5O0HY8HmDfquz04XrdcpJ0P4Z7plRY',
        'https://fastly.picsum.photos/id/397/200/200.jpg?hmac=3VBYe8NBAUuvEizTQB0-d8wp2jgqMblJK8vH3h8cslE',
        'https://fastly.picsum.photos/id/258/200/200.jpg?hmac=SRxBTuyYSeHtVooeEMwmQPB0yIF3fqnvrOBR7DJnOlM',
        'https://fastly.picsum.photos/id/5/200/200.jpg?hmac=oN9VtXdJYLSFssji8vCr48JaI-e5Zi4eH9GAiYBB_Ig',
        'https://fastly.picsum.photos/id/728/200/200.jpg?hmac=ewJNfbVjP_8FUokKp00XS9m2FOzyZbpNE5rG97r7cdw',
        'https://fastly.picsum.photos/id/613/200/200.jpg?hmac=PTvcMRmy696480FNxN3XSkNhN8JREnK_ZzyedvLmcFM',
        'https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
        'https://fastly.picsum.photos/id/247/200/200.jpg?hmac=oKt3N5MCdI8hCrzIbokjpVNzUuywbK64CJn1bfRAxbA',
        'https://fastly.picsum.photos/id/466/200/200.jpg?hmac=VydiBydfVntkv5HY6NXsWaNXDedBW2VWNmm8MqF5Cew',
        'https://fastly.picsum.photos/id/380/200/200.jpg?hmac=kRl3E5LKObBjVmZbpz41OB8xNcPHPWwn_KlpTqhcaOk',
        'https://fastly.picsum.photos/id/933/200/200.jpg?hmac=OW5v0bUFqC97kOeYWLjXhU-5mkb6atERs7CrqdPlRfs',
        'https://fastly.picsum.photos/id/1035/200/200.jpg?hmac=IDuYUZQ_7a6h4pQU2k7p2nxT-MjMt4uy-p3ze94KtA4',
        'https://fastly.picsum.photos/id/996/200/200.jpg?hmac=nRtkfqKyD3p2uHiFO5LmGt31UcH3NKWg80H5yUkZ8_k',
        'https://fastly.picsum.photos/id/818/200/200.jpg?hmac=gfhJZngz3JDsSmE1obNFY5OeAQBVsJLED2VkwuGsC-o',
        'https://fastly.picsum.photos/id/852/200/200.jpg?hmac=4UHLpiS9j3YDnvq-w-MqnP5-ymiyvMs6BNV5ukoTRrI',
        'https://fastly.picsum.photos/id/572/200/200.jpg?hmac=YFsNUCQc2Dfz_5O0HY8HmDfquz04XrdcpJ0P4Z7plRY',
        'https://fastly.picsum.photos/id/397/200/200.jpg?hmac=3VBYe8NBAUuvEizTQB0-d8wp2jgqMblJK8vH3h8cslE',
        'https://fastly.picsum.photos/id/258/200/200.jpg?hmac=SRxBTuyYSeHtVooeEMwmQPB0yIF3fqnvrOBR7DJnOlM',
        'https://fastly.picsum.photos/id/5/200/200.jpg?hmac=oN9VtXdJYLSFssji8vCr48JaI-e5Zi4eH9GAiYBB_Ig',
        'https://fastly.picsum.photos/id/728/200/200.jpg?hmac=ewJNfbVjP_8FUokKp00XS9m2FOzyZbpNE5rG97r7cdw',
        'https://fastly.picsum.photos/id/613/200/200.jpg?hmac=PTvcMRmy696480FNxN3XSkNhN8JREnK_ZzyedvLmcFM',
        'https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
        'https://fastly.picsum.photos/id/247/200/200.jpg?hmac=oKt3N5MCdI8hCrzIbokjpVNzUuywbK64CJn1bfRAxbA',
        'https://fastly.picsum.photos/id/466/200/200.jpg?hmac=VydiBydfVntkv5HY6NXsWaNXDedBW2VWNmm8MqF5Cew',
        'https://fastly.picsum.photos/id/380/200/200.jpg?hmac=kRl3E5LKObBjVmZbpz41OB8xNcPHPWwn_KlpTqhcaOk',
        'https://fastly.picsum.photos/id/933/200/200.jpg?hmac=OW5v0bUFqC97kOeYWLjXhU-5mkb6atERs7CrqdPlRfs',
        'https://fastly.picsum.photos/id/1035/200/200.jpg?hmac=IDuYUZQ_7a6h4pQU2k7p2nxT-MjMt4uy-p3ze94KtA4'
      ];
      */

      try {
        const response = await fetch(
          'https://api.unsplash.com/photos/random?count=15&query=nature&client_id=' + unsplashAccessKey
        );
        const data = await response.json();
        const imageUrls = data.map((image) => image.urls.regular);
        // Duplicating array elements
        const imagesArr = imageUrls.flatMap((element) => [element, element]);
        setImages(shuffleArray(imagesArr));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
      // setImages(shuffleArray(imageArr));
    };

    fetchImages();
  }, []);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      // If this is the second flipped card, check for a match
      const [card1, card2] = flippedCards;
      if (images[card1] === images[card2]) {
        // If there is a match, add the cards to the matchedCards state
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, card1, card2]);
        setFlippedCards([]); // Reset flippedCards
      } else {
        // If there is no match, flip the cards back after a short delay
        setTimeout(() => {
          setFlippedCards([]); // Reset flippedCards
        }, 1000);
      }
      setRetryCount((prevRetryCount) => prevRetryCount + 1); // Increment retryCount
    }
  }, [flippedCards]);


  const handleClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) {
      // If two cards are already flipped or the clicked card is already flipped, ignore the click
      return;
    }

    // Flip the clicked card by adding it to the flippedCards state
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);

    if (flippedCards.length === 1) {
      // If this is the second flipped card, check for a match
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
      if (images[flippedCards[0]] === images[index]) {
        // If there is a match, add the cards to the matchedCards state
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, flippedCards[0], index]);
        setFlippedCards([]);
        setRetryCount((prevRetryCount) => prevRetryCount + 1);

        // Check if all pairs have been matched
        if (matchedCards.length + 2 === images.length) {
          // End the session
          setIsSessionEnded(true);
        }
      } else {
        // If there is no match, flip the cards back after a short delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
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
      {images.length > 0 ? (
      <>
        <p>Retries: {retryCount}</p>
        {renderGrid()}
        {isSessionEnded && (
          <div className="score">
            <p>Session Ended</p>
            <p>Score: {((matchedCards.length / retryCount) * 100).toFixed(2)}%</p>
            <Link legacyBehavior href="/">
              <button onClick={() => setIsSessionEnded(false)} className="return-home-button">Return to Home</button>
            </Link>
          </div>
        )}
      </>
      ) : (
      <p>Loading...</p>
      )}
    </div>
  );
}

export default Game;
