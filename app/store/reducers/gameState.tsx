import { UPDATE_GAME_STATE } from '../actions/actionTypes';

const initialState = {
  flippedCards: [],
  matchedCards: [],
  retryCount: 0,
  score: 0,
  isSessionEnded: false,
};

const gameStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAME_STATE:
      return {
        ...state,
        flippedCards: action.payload.flippedCards,
        matchedCards: action.payload.matchedCards,
        retryCount: action.payload.retryCount,
        score: action.payload.score,
        isSessionEnded: action.payload.isSessionEnded,
      };
    default:
      return state;
  }
};

export default gameStateReducer;
