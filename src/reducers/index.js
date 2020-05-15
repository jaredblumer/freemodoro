import {
  INCREMENT_ROUND,
  TOGGLE_BREAK,
  SAVE_SETTINGS,
  LOGIN,
  LOGOUT,
  UPDATE_USERNAME
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
    case LOGIN:
      return {
        ...state,
        user: {
          username: action.payload,
          loggedIn: !state.user.loggedIn
        }
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          ...state.user,
          loggedIn: !state.user.loggedIn
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
    case UPDATE_USERNAME:
      console.log(action.payload);
      break;
    default:
      return state;
  }
}
