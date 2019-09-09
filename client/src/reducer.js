import {
  DARK_THEME_ACTIVE,
  DARK_THEME_INACTIVE,
  SIGNED_IN_SUCCEEDED,
  RESET_SIGNED_IN_SUCCEEDED
} from './ActionType';

const initialState = {
  darkThemeActive: false,
  isSignedInSuccess: false
};

let darkTheme = {
  status: false,
  isSignedInSuccess: false
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
    case SIGNED_IN_SUCCEEDED:
      return Object.assign({}, state, {
        isSignedInSuccess: action.payload
      });
    case RESET_SIGNED_IN_SUCCEEDED:
      return Object.assign({}, state, {
        isSignedInSuccess:action.payload
      })

    default:
      return state;
  }
}

export const getStatusOfDarkmode = () => {
  return darkTheme;
};
