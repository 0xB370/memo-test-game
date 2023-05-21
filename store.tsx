import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './app/store/reducers/updateScore'; 

const store = createStore(rootReducer);

export const wrapWithProvider = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export default store;