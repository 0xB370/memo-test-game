import { UPDATE_GAME_STATE, UPDATE_IMAGES, RESET_GAME_STATE } from '../actions/actionTypes';

const initialState = {
    nature: {
        flippedCards: [],
        matchedCards: [],
        retryCount: 0,
        score: 0,
        isSessionEnded: false,
        images: [],
    },
    animals: {
        flippedCards: [],
        matchedCards: [],
        retryCount: 0,
        score: 0,
        isSessionEnded: false,
        images: [],
    },
    food: {
        flippedCards: [],
        matchedCards: [],
        retryCount: 0,
        score: 0,
        isSessionEnded: false,
        images: [],
    },
};

const gameStateReducer = (state = initialState, action) => {
    console.log('action');
    console.log(action);
    
    switch (action.type) {
        case UPDATE_GAME_STATE:
            return {
            ...state,
            [action.payload.category]: {
                ...state[action.payload.category],
                flippedCards: action.payload.gameState.flippedCards,
                matchedCards: action.payload.gameState.matchedCards,
                retryCount: action.payload.gameState.retryCount,
                score: action.payload.gameState.score,
                isSessionEnded: action.payload.gameState.isSessionEnded,
            },
            };
        case UPDATE_IMAGES:
            return {
            ...state,
            [action.payload.category]: {
                ...state[action.payload.category],
                images: action.payload.images,
            },
            };
        case RESET_GAME_STATE:
            return {
            ...state,
            [action.payload.category]: {
                flippedCards: [],
                matchedCards: [],
                retryCount: 0,
                score: 0,
                isSessionEnded: false,
                images: [],
            },
        };
      default:
        return state;
    }  
};

export default gameStateReducer;
