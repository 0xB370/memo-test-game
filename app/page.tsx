'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const MemoTestGamePage: React.FC = () => {
  const dispatch = useDispatch();
  const highestNatureScore = useSelector((state) => state.natureScore);
  const highestAnimalScore = useSelector((state) => state.animalsScore);
  const highestFoodScore = useSelector((state) => state.foodScore);

  // Obtener la lista de memo tests desde el backend o almacenamiento local
  const memoTests = [
    { id: 1, name: 'Nature', highestScore: highestNatureScore },
    { id: 2, name: 'Animals', highestScore: highestAnimalScore },
    { id: 3, name: 'Food', highestScore: highestFoodScore },
    // ...
  ];

  return (
    <div>
      <h1>Memo Test Game</h1>
      <ul>
        {memoTests.map((memoTest) => (
          <li key={memoTest.id}>
            <Link legacyBehavior href={`/game?category=${memoTest.name.toLowerCase()}`}>
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
