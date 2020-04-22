import { INCREMENT_ROUND, TOGGLE_BREAK } from "../actions/types";

export default function(state, action) {
  switch (action.type) {
    case INCREMENT_ROUND:
      if (state.data.currentRound === state.data.totalRound - 1) {
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
    case TOGGLE_BREAK:
      return {
        ...state,
        data: {
          ...state.data,
          onBreak: !state.data.onBreak
        }
      };
    default:
      return state;
  }
}
