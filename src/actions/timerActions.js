import { INCREMENT_ROUND, TOGGLE_BREAK } from "./types";

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
