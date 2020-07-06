import {
  INCREMENT_ROUND,
  TOGGLE_BREAK,
  SAVE_SETTINGS,
  UPDATE_USERNAME,
  TOGGLE_SHORTBREAK,
  TOGGLE_LONGBREAK,
  TOGGLE_POMODORO
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
    case TOGGLE_SHORTBREAK:
      return {
        ...state,
        data: {
          ...state.data,
          onBreak: true,
          breakType: "short"
        }
      };
    case TOGGLE_LONGBREAK:
      return {
        ...state,
        data: {
          ...state.data,
          onBreak: true,
          breakType: "long"
        }
      };
    case TOGGLE_POMODORO:
      return {
        ...state,
        data: {
          ...state.data,
          onBreak: false
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
