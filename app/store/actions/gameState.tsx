import * as actionTypes from "./actionTypes";

export const updateGameState = (gameState) => ({
    type: actionTypes.UPDATE_GAME_STATE,
    payload: gameState,
});
