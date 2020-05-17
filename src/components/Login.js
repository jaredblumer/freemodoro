import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, saveSettings } from "../actions/timerActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          let self = this;
          let settings = {};
          // Retrieve and save settings
          res
            .json()
            .then(function(data) {
              settings.longBreakLength = data.longBreakLength * 60;
              settings.roundLength = data.roundLength * 60;
              settings.shortBreakLength = data.shortBreakLength * 60;
              settings.totalGoal = data.totalGoal;
              settings.totalRound = data.totalRound;
            })
            .then(function() {
              self.props.saveSettings(settings);
            })
            .then(function() {
              self.props.login();
            })
            .then(function() {
              self.setState({ redirect: true });
            });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in. Please try again.");
      });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit" />
        </form>
        <p>
          <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}

export default connect(null, { login, saveSettings })(Login);
