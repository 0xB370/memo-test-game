import { UPDATE_GAME_STATE, UPDATE_IMAGES } from '../actions/actionTypes';

const initialState = {
  flippedCards: [],
  matchedCards: [],
  retryCount: 0,
  score: 0,
  isSessionEnded: false,
  images: [], 
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
    case UPDATE_IMAGES: 
      return {
        ...state,
        images: action.payload.images,
      };
    default:
      return state;
  }
};

export default gameStateReducer;
