import { INCREMENT_ROUND } from "../actions/types";

export default function(state, action) {
  switch (action.type) {
    case INCREMENT_ROUND:
      if (state.data.currentRound === state.data.totalRound) {
        return {
          ...state,
          data: {
            ...state.data,
            currentRound: 0,
            currentGoal: state.data.currentGoal + 1
          }
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            currentRound: state.data.currentRound + 1,
            currentGoal: state.data.currentGoal + 1
          }
        };
      }

    default:
      return state;
  }
}
