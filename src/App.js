import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";

import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <Pomodoro />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
