import {
  INCREMENT_ROUND,
  TOGGLE_BREAK,
  SAVE_SETTINGS,
  LOGIN,
  LOGOUT
} from "./types";

export const incrementRound = () => {
  return {
    type: INCREMENT_ROUND
  };
};

export const login = username => {
  return {
    type: LOGIN,
    payload: username
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const toggleBreak = () => {
  return {
    type: TOGGLE_BREAK
  };
};

export const saveSettings = object => {
  return {
    type: SAVE_SETTINGS,
    payload: object
  };
};
