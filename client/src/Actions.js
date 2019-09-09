import { DARK_THEME_ACTIVE, DARK_THEME_INACTIVE, SIGNED_IN_SUCCEEDED, RESET_SIGNED_IN_SUCCEEDED } from './ActionType';

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

export const setIsSignedInSucceeded = () => {
  return (
    {
      type: SIGNED_IN_SUCCEEDED,
      payload: true
    }
  )
}

export const resetSignedInSucceeded = () => {
  return (
    {
      type: RESET_SIGNED_IN_SUCCEEDED,
      payload: false
    }
  )
}


