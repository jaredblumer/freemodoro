import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import Description from "./components/Description";

import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/settings">
              <div className="container">
                <Settings />
              </div>
              <Description />
              <footer>
                Built by{" "}
                <a href="https://github.com/jaredblumer">Jared Blumer</a>
              </footer>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <div className="container">
                <Pomodoro />
              </div>
              <Description />
              <footer>
                Built by{" "}
                <a
                  className="footer-links"
                  href="https://github.com/jaredblumer"
                >
                  Jared Blumer
                </a>
                {" | "}
                <a
                  className="footer-links"
                  href="https://github.com/jaredblumer/freemodoro"
                >
                  GitHub
                </a>
              </footer>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
