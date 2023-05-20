'use client';

import { useEffect, useState } from 'react';

function Game() {
  const [clientRendered, setClientRendered] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch or generate the array of 30 image URLs
    // Replace this with your own logic to fetch or generate the URLs
    const fetchImages = async () => {
      /*
      const response = await fetch('https://api.api-ninjas.com/v1/randomimage?category=nature');
      const data = await response.json();
      setImages(data.images);
      */
      setImages([
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
      ]);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  const handleClick = (index) => {
    // Handle card click logic
    // ...
  };

  const renderGrid = () => {
    const gridSize = 6;
    const rowSize = 5;
    const totalCards = gridSize * rowSize;

    return (
      <div className="card-container">
        {images.slice(0, totalCards).map((image, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleClick(index)}
          >
            <img src={image} alt={`Card ${index}`} className="card-image" />
            <div className="card-overlay"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Memory Game</h1>
      {clientRendered && renderGrid()}
    </div>
  );
}

export default Game;
