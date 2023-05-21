import * as actionTypes from "./actionTypes";

export const updateNatureScore = (score) => {
    return {
        type: actionTypes.UPDATE_NATURE_SCORE,
        score
    }
}

export const updateAnimalsScore = (score) => {
    return {
        type: actionTypes.UPDATE_ANIMALS_SCORE,
        score
    }
}

export const updateFoodScore = (score) => {
    return {
        type: actionTypes.UPDATE_FOOD_SCORE,
        score
    }
}
