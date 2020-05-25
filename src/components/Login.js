import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, saveSettings } from "../actions/timerActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
              self.props.login(self.state.email);
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
      <div className="login-container">
        <div>
          <h1>Freemodoro</h1>

          <form onSubmit={this.onSubmit}>
            <div className="textfield-container">
              <TextField
                className="TextField"
                type="email"
                label="Email"
                name="email"
                variant="filled"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="textfield-container">
              <TextField
                className="TextField"
                type="password"
                label="Password"
                name="password"
                variant="filled"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="login-buttons">
              <Link to="/" className="link">
                <Button>Home</Button>
              </Link>
              <Link to="/register" className="link">
                <Button id="button-margin">Register</Button>
              </Link>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { login, saveSettings })(Login);
