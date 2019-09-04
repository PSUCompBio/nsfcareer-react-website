import { DARK_THEME_ACTIVE, DARK_THEME_ACTIVE_INACTIVE } from './ActionType';

const initialState = {
  darkThemeActive:false
}
var abc = false;
export function darkThemeController(action) {
  console.log(action)
  switch (action) {
    case DARK_THEME_ACTIVE:
      abc = action.payload
      console.log( action.payload);
        return Object.assign({}, initialState, {
          darkThemeActive: action.payload
        })
  }
}

export const getStatusOfDarkmode = ()=>{
  return abc;
}