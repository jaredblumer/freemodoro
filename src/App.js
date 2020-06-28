import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import Description from "./components/Description";
import Footer from "./components/Footer";

import store from "./store";

class App extends React.Component {
  componentDidUpdate() {
    const { onBreak, breakType } = this.props;

    if (onBreak && breakType === "short") {
      let links = document.getElementsByClassName("footer-links");
      console.log(links);
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("long-break-link");
        links[i].classList.add("short-break-link");
      }
    } else if (onBreak && breakType === "long") {
      let links = document.getElementsByClassName("footer-links");
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("short-break-link");
        links[i].classList.add("long-break-link");
      }
    } else {
      let links = document.getElementsByClassName("footer-links");
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("short-break-link");
        links[i].classList.remove("long-break-link");
      }
    }
  }

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
              <Footer />
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
              <Footer />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
