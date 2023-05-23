import { UPDATE_GAME_STATE, UPDATE_IMAGES } from "./actionTypes";

export const updateGameState = (gameState) => ({
    type: UPDATE_GAME_STATE,
    payload: gameState,
});

export const updateImages = (gameState) => ({
    type: UPDATE_IMAGES,
    payload: gameState,
});
