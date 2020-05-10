import {
  INCREMENT_ROUND,
  TOGGLE_BREAK,
  SAVE_SETTINGS,
  TOGGLE_LOGIN
} from "../actions/types";

export default function(state, action) {
  switch (action.type) {
    case INCREMENT_ROUND:
      if (state.data.currentRound === state.data.totalRound - 1) {
        return {
          ...state,
          data: {
            ...state.data,
            currentRound: 0,
            currentGoal: state.data.currentGoal + 1,
            breakType: "long"
          }
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            currentRound: state.data.currentRound + 1,
            currentGoal: state.data.currentGoal + 1,
            breakType: "short"
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
    case TOGGLE_LOGIN:
      return {
        ...state,
        data: {
          ...state.data,
          loggedIn: !state.data.loggedIn
        }
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        data: {
          ...state.data,
          shortBreakLength: action.payload.shortBreakLength,
          longBreakLength: action.payload.longBreakLength,
          roundLength: action.payload.roundLength,
          totalGoal: action.payload.totalGoal,
          totalRound: action.payload.totalRound
        }
      };
    default:
      return state;
  }
}
