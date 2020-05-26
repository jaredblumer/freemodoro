import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { saveSettings } from "../actions/timerActions";
import Button from "@material-ui/core/Button";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.renderValue = this.renderValue.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < 5; i++) {
      let id = inputs[i].getAttribute("id");
      this.renderValue(id);
    }
  }

  renderValue(id) {
    let value = document.getElementById(id).value;
    document.getElementById(id + "Output").innerHTML = value;
  }

  save() {
    let object = {};
    object.totalRound = document.getElementById("sessionsPerRoundOutput").value;
    object.totalGoal = document.getElementById("dailyGoalOutput").value;
    object.shortBreakLength =
      document.getElementById("shortBreakLengthOutput").value * 60;
    object.longBreakLength =
      document.getElementById("longBreakLengthOutput").value * 60;
    object.roundLength =
      document.getElementById("roundLengthOutput").value * 60;
    this.props.saveSettings(object);

    if (this.props.loggedIn) {
      let bodyObj = object;
      bodyObj.shortBreakLength = bodyObj.shortBreakLength / 60;
      bodyObj.longBreakLength = bodyObj.longBreakLength / 60;
      bodyObj.roundLength = bodyObj.roundLength / 60;
      bodyObj.email = this.props.username;

      fetch("/api/saveSettings", {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="settings-container">
        <div>
          <h1>Settings</h1>
          <div>
            <label htmlFor="roundLength">Round Length</label>
            <br />
            <input
              type="range"
              id="roundLength"
              name="roundLength"
              min="1"
              max="60"
              step="1"
              defaultValue={this.props.roundLength / 60}
              onChange={id => this.renderValue("roundLength")}
            />
            <output id="roundLengthOutput"></output>
          </div>
          <div>
            <label htmlFor="shortBreakLength">Short Break Length</label>
            <br />
            <input
              type="range"
              id="shortBreakLength"
              name="shortBreakLength"
              min="1"
              max="60"
              step="1"
              defaultValue={this.props.shortBreakLength / 60}
              onChange={id => this.renderValue("shortBreakLength")}
            />
            <output id="shortBreakLengthOutput"></output>
          </div>
          <div>
            <label htmlFor="longBreakLength">Long Break Length</label>
            <br />
            <input
              type="range"
              id="longBreakLength"
              name="longBreakLength"
              min="1"
              max="60"
              step="1"
              defaultValue={this.props.longBreakLength / 60}
              onChange={id => this.renderValue("longBreakLength")}
            />
            <output id="longBreakLengthOutput"></output>
          </div>
          <div>
            <label htmlFor="sessionsPerRound">Sessions Per Round</label>
            <br />
            <input
              type="range"
              id="sessionsPerRound"
              name="sessionsPerRound"
              min="1"
              max="20"
              step="1"
              defaultValue={this.props.totalRound}
              onChange={id => this.renderValue("sessionsPerRound")}
            />
            <output id="sessionsPerRoundOutput"></output>
          </div>
          <div>
            <label htmlFor="dailyGoal">Daily Goal</label>
            <br />
            <input
              type="range"
              id="dailyGoal"
              name="dailyGoal"
              min="1"
              max="60"
              step="1"
              defaultValue={this.props.totalGoal}
              onChange={id => this.renderValue("dailyGoal")}
            />
            <output id="dailyGoalOutput"></output>
          </div>
          <div className="login-buttons">
            <Link to="/" className="link">
              <Button id="button-margin">Home</Button>
            </Link>
            <Button variant="contained" type="button" onClick={this.save}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentGoal: state.data.currentGoal,
    currentRound: state.data.currentRound,
    totalGoal: state.data.totalGoal,
    totalRound: state.data.totalRound,
    onBreak: state.data.onBreak,
    breakType: state.data.breakType,
    shortBreakLength: state.data.shortBreakLength,
    longBreakLength: state.data.longBreakLength,
    roundLength: state.data.roundLength,
    loggedIn: state.user.loggedIn,
    username: state.user.username
  };
};

Settings.propTypes = {
  saveSettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { saveSettings })(Settings);
