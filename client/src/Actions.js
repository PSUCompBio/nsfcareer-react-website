import { DARK_THEME_ACTIVE, DARK_THEME_INACTIVE } from './ActionType';

export const darkThemeActiveSetter = () => {
  return (
    {
      type: DARK_THEME_ACTIVE,
      payload: true
    }
  )
}

export const darkThemeInactiveSetter = () => {
  return (
    {
      type: DARK_THEME_INACTIVE,
      payload: false
    }
  )
}

