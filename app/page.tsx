import React from 'react';
import Link from 'next/link';

const MemoTestGamePage: React.FC = () => {
  // Obtener la lista de memo tests desde el backend o almacenamiento local
  const memoTests = [
    { id: 1, name: 'Memo Test 1', highestScore: 80 },
    { id: 2, name: 'Memo Test 2', highestScore: 90 },
    // ...
  ];

  return (
    <div>
      <h1>Memo Test Game</h1>
      <ul>
        {memoTests.map((memoTest) => (
          <li key={memoTest.id}>
            <Link legacyBehavior href={`/game/${memoTest.id}`}>
              <a>
                {memoTest.name} - Highest Score: {memoTest.highestScore}
              </a>
            </Link>
          </li>
        ))}
        <Link legacyBehavior href="/game">
          <a>Start Game</a>
        </Link>
      </ul>
    </div>
  );
};

export default MemoTestGamePage;
