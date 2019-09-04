import { DARK_THEME_ACTIVE, DARK_THEME_ACTIVE_INACTIVE } from './ActionType';

export const darkThemeSetter = () => {
  return (
    {
      type: DARK_THEME_ACTIVE,
      payload: true
    }
  )
}

