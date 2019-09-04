import { createStore } from 'redux';
import { darkThemeController } from './reducer';

const initialState = {
  darkThemeActive:false
}

const store = createStore(darkThemeController, initialState);

export default store;