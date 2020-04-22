import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  user: {
    username: null,
    loggedIn: false
  },
  data: {
    currentRound: 0,
    totalRound: 4,
    currentGoal: 0,
    totalGoal: 12,
    onBreak: false,
    secondsStart: 10
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
