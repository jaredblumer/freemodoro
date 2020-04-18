import { INCREMENT_ROUND } from "../actions/types";

export default function(state, action) {
  switch (action.type) {
    case INCREMENT_ROUND:
      console.log("increment round reducer called");
      return {
        ...state,
        data: {
          ...state.data,
          currentRound: state.data.currentRound + 1
        }
      };
    default:
      console.log("default reducer selected");
      return state;
  }
}
