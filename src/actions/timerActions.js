import {
  INCREMENT_ROUND,
  TOGGLE_BREAK,
  SAVE_SETTINGS,
  TOGGLE_LOGIN
} from "./types";

export const incrementRound = () => {
  return {
    type: INCREMENT_ROUND
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

export const toggleLogin = () => {
  return {
    type: TOGGLE_LOGIN
  };
};
