import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProgressButton from "./ProgressButton";
import Timer from "./Timer";
import { incrementRound, toggleBreak } from "../actions/timerActions";
import { Link } from "react-router-dom";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: this.determineSecondsStart(),
      timerOn: false,
      timerInterval: null
    };
    this.handleNav = this.handleNav.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timer = this.timer.bind(this);
    this.determineSecondsStart = this.determineSecondsStart.bind(this);
  }

  handleNav() {
    let nav = document.getElementById("nav");
    if (!nav.classList.contains("nav-active")) {
      nav.style.visibility = "visible";
      nav.classList.add("nav-active");
    } else {
      nav.classList.remove("nav-active");
      nav.style.visibility = "hidden";
    }
  }

  determineSecondsStart() {
    if (this.props.onBreak) {
      return this.props.shortBreakLength;
    } else {
      return this.props.roundLength;
    }
  }

  resetTimer() {
    this.setState({
      secondsRemaining: this.determineSecondsStart(),
      timerOn: false
    });
    clearInterval(this.state.timerInterval);
  }

  timer() {
    if (!this.state.timerOn) {
      this.setState({
        timerInterval: setInterval(() => {
          if (this.state.secondsRemaining > 0) {
            this.setState(prevState => ({
              secondsRemaining: prevState.secondsRemaining - 1
            }));
          } else {
            if (!this.props.onBreak) {
              // Update break background color
              document.body.style.backgroundColor = "green";
              this.props.incrementRound();
              this.props.toggleBreak();
              this.setState({
                secondsRemaining: this.determineSecondsStart()
              });
            } else {
              // Update active round background color
              this.props.toggleBreak();
              document.body.style.backgroundColor = "white";
              this.setState({
                secondsRemaining: this.determineSecondsStart()
              });
            }
          }
        }, 1000),
        timerOn: true
      });
    } else {
      clearInterval(this.state.timerInterval);
      setTimeout(
        this.setState(prevState => ({
          timerOn: false
        })),
        1500
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="name">Freemodoro</div>
          <div className="menu">
            <i
              className="fas fa-bars menu-button"
              data-testid="menu-button"
              onClick={this.handleNav}
            ></i>
          </div>
        </header>
        <nav id="nav" data-testid="nav" style={{ visibility: "hidden" }}>
          <ul>
            <li>Sign In</li>
            <li>Charts</li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="timer">
          <button data-testid="timer-display" onClick={this.resetTimer}>
            <Timer secondsRemaining={this.state.secondsRemaining} />
          </button>
        </div>
        <div className="start">
          <button
            id="svg-button"
            data-testid="timer-button"
            onClick={this.timer}
          >
            <ProgressButton
              secondsRemaining={this.state.secondsRemaining}
              secondsStart={this.determineSecondsStart()}
              timerOn={this.state.timerOn}
            />
          </button>
        </div>
        <div className="data">
          <div className="round">
            <div className="round-title">Round</div>
            <div className="round-data">
              <span className="footer-data-current" data-testid="currentRound">
                {this.props.currentRound}
              </span>
              <span className="footer-data-goal">/{this.props.totalRound}</span>
            </div>
          </div>
          <div className="goal">
            <div className="goal-title">Goal</div>
            <div className="goal-data">
              <span className="footer-data-current">
                {this.props.currentGoal}
              </span>
              <span className="footer-data-goal">/{this.props.totalGoal}</span>
            </div>
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
    shortBreakLength: state.data.shortBreakLength,
    longBreakLength: state.data.longBreakLength,
    roundLength: state.data.roundLength
  };
};

Pomodoro.propTypes = {
  incrementRound: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { incrementRound, toggleBreak })(
  Pomodoro
);
