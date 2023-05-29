import { UPDATE_GAME_STATE, UPDATE_IMAGES, RESET_GAME_STATE } from "./actionTypes";

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

export const resetGameState = (category) => {
    return {
        type: RESET_GAME_STATE,
        payload: {
        category
        },
    };
};
