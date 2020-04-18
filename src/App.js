import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Pomodoro from "./components/Pomodoro";

import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Pomodoro />
      </Provider>
    );
  }
}

export default App;
