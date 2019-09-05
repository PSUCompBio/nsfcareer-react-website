import { createStore } from 'redux';
import { darkThemeController } from './reducer';

const store = createStore(darkThemeController);

export default store;