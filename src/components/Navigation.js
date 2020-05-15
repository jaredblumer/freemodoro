import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/timerActions";

class Navigation extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <nav id="nav" data-testid="nav" style={{ visibility: "hidden" }}>
          <ul>
            <li>
              <button onClick={this.props.logout}>Log Out</button>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav id="nav" data-testid="nav" style={{ visibility: "hidden" }}>
          <ul>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn
  };
};

export default connect(mapStateToProps, { logout })(Navigation);
