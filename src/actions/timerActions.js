import { INCREMENT_ROUND } from "./types";

export const incrementRound = () => {
  return {
    type: INCREMENT_ROUND,
    payload: 1
  };
};
