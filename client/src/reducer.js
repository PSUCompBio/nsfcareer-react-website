import { DARK_THEME_ACTIVE, DARK_THEME_INACTIVE } from './ActionType';

const initialState = {
  darkThemeActive: false
};

let darkTheme = {
  status:false
};

export function darkThemeController(state = initialState, action) {
  switch (action.type) {
    case DARK_THEME_ACTIVE:
        darkTheme.status = action.payload;
      return Object.assign({}, state, {
        darkThemeActive: action.payload
      });

    case DARK_THEME_INACTIVE:
        darkTheme.status = action.payload;
      return Object.assign({}, state, {
        darkThemeActive: action.payload
      });

    default:
      return state;
  }
}

export const getStatusOfDarkmode = () => {
  return darkTheme;
};
