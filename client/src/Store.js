import { createStore } from 'redux';
import { darkThemeController } from './reducer';

function saveTOLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(error);
  }
}

const store = createStore(darkThemeController);
store.subscribe(() => {
  saveTOLocalStorage(store.getState());
});
export default store;
