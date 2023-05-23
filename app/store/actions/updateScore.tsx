import { UPDATE_NATURE_SCORE, UPDATE_ANIMALS_SCORE, UPDATE_FOOD_SCORE } from "./actionTypes";

export const updateNatureScore = (score) => {
    return {
        type: UPDATE_NATURE_SCORE,
        score
    }
}

export const updateAnimalsScore = (score) => {
    return {
        type: UPDATE_ANIMALS_SCORE,
        score
    }
}

export const updateFoodScore = (score) => {
    return {
        type: UPDATE_FOOD_SCORE,
        score
    }
}
