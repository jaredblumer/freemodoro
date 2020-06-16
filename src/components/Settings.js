import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { saveSettings } from "../actions/timerActions";

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
      <div className="Settings">
        <header>
          <div className="name">
            <h1>Freemodoro</h1>
          </div>
          <div className="menu">
            <Link to="/Home">
              <button>Home</button>
            </Link>
          </div>
        </header>
        <div className="display">
          <label htmlFor="roundLength">Round Length</label>
          <div className="setting-container">
            <input
              type="range"
              id="roundLength"
              name="roundLength"
              min="1"
              max="60"
              step="1"
              className="slider"
              defaultValue={this.props.roundLength / 60}
              onChange={id => this.renderValue("roundLength")}
            />
            <div className="slider-output">
              <output id="roundLengthOutput"></output>
            </div>
          </div>
          <label htmlFor="shortBreakLength">Short Break Length</label>
          <div className="setting-container">
            <input
              type="range"
              id="shortBreakLength"
              name="shortBreakLength"
              min="1"
              max="60"
              step="1"
              className="slider"
              defaultValue={this.props.shortBreakLength / 60}
              onChange={id => this.renderValue("shortBreakLength")}
            />
            <div className="slider-output">
              <output id="shortBreakLengthOutput"></output>
            </div>
          </div>
          <label htmlFor="longBreakLength">Long Break Length</label>
          <div className="setting-container">
            <input
              type="range"
              id="longBreakLength"
              name="longBreakLength"
              min="1"
              max="60"
              step="1"
              className="slider"
              defaultValue={this.props.longBreakLength / 60}
              onChange={id => this.renderValue("longBreakLength")}
            />
            <div className="slider-output">
              <output id="longBreakLengthOutput"></output>
            </div>
          </div>
          <label htmlFor="sessionsPerRound">Sessions Per Round</label>
          <div className="setting-container">
            <input
              type="range"
              id="sessionsPerRound"
              name="sessionsPerRound"
              min="1"
              max="20"
              step="1"
              className="slider"
              defaultValue={this.props.totalRound}
              onChange={id => this.renderValue("sessionsPerRound")}
            />
            <div className="slider-output">
              <output id="sessionsPerRoundOutput"></output>
            </div>
          </div>
          <label htmlFor="dailyGoal">Daily Goal</label>
          <div className="setting-container">
            <input
              type="range"
              id="dailyGoal"
              name="dailyGoal"
              min="1"
              max="60"
              step="1"
              className="slider"
              defaultValue={this.props.totalGoal}
              onChange={id => this.renderValue("dailyGoal")}
            />
            <div className="slider-output">
              <output id="dailyGoalOutput"></output>
            </div>
          </div>
          <div className="button-container">
            <button type="button" id="save-button" onClick={this.save}>
              Save
            </button>
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
