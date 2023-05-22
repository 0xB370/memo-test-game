import * as actionTypes from "../actions/actionTypes";

const initialState = {
    flippedCards: [],
    matchedCards: [],
    retryCount: 0,
    score: 0,
    isSessionEnded: false,
};
  
const gsreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_GAME_STATE:
            return { 
                ...state, 
                retryCount: action.payload.retryCount
            };
        default:
            return state;
    }
};
  
  export default gsreducer;
  