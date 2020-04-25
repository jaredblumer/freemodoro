import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { saveSettings } from "../actions/timerActions";

class Settings extends React.Component {
  constructor(props) {
    super(props);
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
    object.breakLength = document.getElementById(
      "shortBreakLengthOutput"
    ).value;
    object.roundLength = document.getElementById("roundLengthOutput").value;
    this.props.saveSettings(object);
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
        <div>
          <label htmlFor="roundLength">Round Length</label>
          <input
            type="range"
            id="roundLength"
            name="roundLength"
            min="1"
            max="60"
            step="1"
            defaultValue={this.props.roundLength}
            onChange={id => this.renderValue("roundLength")}
          />
          <output id="roundLengthOutput"></output>
        </div>
        <div>
          <label htmlFor="shortBreakLength">Short Break Length</label>
          <input
            type="range"
            id="shortBreakLength"
            name="shortBreakLength"
            min="1"
            max="60"
            step="1"
            defaultValue={this.props.breakLength}
            onChange={id => this.renderValue("shortBreakLength")}
          />
          <output id="shortBreakLengthOutput"></output>
        </div>
        <div>
          <label htmlFor="longBreakLength">Short Break Length</label>
          <input
            type="range"
            id="longBreakLength"
            name="longBreakLength"
            min="1"
            max="60"
            step="1"
            defaultValue="25"
            onChange={id => this.renderValue("longBreakLength")}
          />
          <output id="longBreakLengthOutput"></output>
        </div>

        <div>
          <label htmlFor="sessionsPerRound">Sessions Per Round</label>
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
        <div>
          <label htmlFor="autoResetTime">Auto-Reset Time</label>
        </div>
        <div>
          <button onClick={this.save}>Save</button>
        </div>
        <Link to="/">Home</Link>
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
    breakLength: state.data.breakLength,
    roundLength: state.data.roundLength
  };
};

Settings.propTypes = {
  saveSettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { saveSettings })(Settings);
