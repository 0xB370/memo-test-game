import React from 'react';
import Link from 'next/link';

const MemoTestGamePage: React.FC = () => {
  // Obtener la lista de memo tests desde el backend o almacenamiento local
  const memoTests = [
    { id: 1, name: 'Nature', highestScore: 80 },
    { id: 2, name: 'Animals', highestScore: 90 },
    { id: 3, name: 'Food', highestScore: 75 },
    // ...
  ];

  return (
    <div>
      <h1>Memo Test Game</h1>
      <ul>
        {memoTests.map((memoTest) => (
          <li key={memoTest.id}>
            <Link legacyBehavior href={`/game?category=${memoTest.name}`}>
              <a>
                {memoTest.name} - Highest Score: {memoTest.highestScore}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoTestGamePage;
