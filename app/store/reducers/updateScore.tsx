import * as actionTypes from "../actions/actionTypes";

const initialState = {
    natureScore: 0,
    animalsScore: 0,
    foodScore: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_NATURE_SCORE:
            return {
                ...state,
                natureScore: action.score
            };
        case actionTypes.UPDATE_ANIMALS_SCORE:
            return {
                ...state,
                animalsScore: action.score
            };
        case actionTypes.UPDATE_FOOD_SCORE:
            return {
                ...state,
                foodScore: action.score
            };
        default:
            return state;
    }
}

export default reducer;