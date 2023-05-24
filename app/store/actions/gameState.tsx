import { UPDATE_GAME_STATE, UPDATE_IMAGES } from "./actionTypes";

export const updateGameState = (category, gameState) => {
    return {
        type: UPDATE_GAME_STATE,
        payload: {
        category,
        gameState,
        },
    };
};
  
export const updateImages = (category, images) => {
    return {
        type: UPDATE_IMAGES,
        payload: {
        category,
        images,
        },
    };
};
