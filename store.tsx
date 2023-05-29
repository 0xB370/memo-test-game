import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import updateScore from './app/store/reducers/updateScore'; 
import gameState from './app/store/reducers/gameState'; 

const rootReducer = combineReducers({
  updateScore,
  gameState,
});

const store = configureStore({
  reducer: rootReducer,
});

export const wrapWithProvider = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export default store;
