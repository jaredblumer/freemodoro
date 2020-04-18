import { INCREMENT_ROUND } from "./types";

export const incrementRound = () => {
  console.log("increment round selected");
  return {
    type: INCREMENT_ROUND,
    payload: 1
  };
};
