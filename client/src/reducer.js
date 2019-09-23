import {
  DARK_THEME_ACTIVE,
  DARK_THEME_INACTIVE,
  SIGNED_IN_SUCCEEDED,
  RESET_SIGNED_IN_SUCCEEDED,
  USER_INFO,
  MILITARY_VERSION
} from './ActionType';

const initialState = {
  darkThemeActive: false,
  isSignedInSuccess: false,
  militaryVersion: true,
  userInfo:''
};

let darkTheme = {
  status: true
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
        isSignedInSuccess: action.payload
      });
    case USER_INFO:
      return Object.assign({}, state, { userInfo: action.payload });
    case MILITARY_VERSION:
      return Object.assign({}, state, { militaryVersion: action.payload });

    default:
      return state;
  }
}

export const getStatusOfDarkmode = () => {
  return darkTheme;
};
