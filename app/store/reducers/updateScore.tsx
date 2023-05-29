import { UPDATE_NATURE_SCORE, UPDATE_ANIMALS_SCORE, UPDATE_FOOD_SCORE } from "../actions/actionTypes";

const initialState = {
    natureScore: 0,
    animalsScore: 0,
    foodScore: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NATURE_SCORE:
            return {
                ...state,
                natureScore: action.score
            };
        case UPDATE_ANIMALS_SCORE:
            return {
                ...state,
                animalsScore: action.score
            };
        case UPDATE_FOOD_SCORE:
            return {
                ...state,
                foodScore: action.score
            };
        default:
            return state;
    }
}

export default reducer;