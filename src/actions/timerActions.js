import {
  INCREMENT_ROUND,
  TOGGLE_BREAK,
  SAVE_SETTINGS,
  TOGGLE_SHORTBREAK,
  TOGGLE_LONGBREAK,
  TOGGLE_POMODORO
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

export const toggleShortBreak = () => {
  return {
    type: TOGGLE_SHORTBREAK
  };
};

export const toggleLongBreak = () => {
  return {
    type: TOGGLE_LONGBREAK
  };
};

export const togglePomodoro = () => {
  return {
    type: TOGGLE_POMODORO
  };
};

export const saveSettings = object => {
  return {
    type: SAVE_SETTINGS,
    payload: object
  };
};
