import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProgressButton from "./ProgressButton";
import Timer from "./Timer";
import { incrementRound } from "../actions/timerActions";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsStart: 10,
      secondsRemaining: 10,
      timerOn: false,
      timerInterval: null,
      break: false
    };
    this.handleNav = this.handleNav.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timer = this.timer.bind(this);
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

  resetTimer() {
    this.setState({
      secondsRemaining: this.state.secondsStart,
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
            this.props.incrementRound();
            this.setState({
              secondsStart: 10,
              secondsRemaining: 10
            });
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
            <li>Options</li>
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
              secondsStart={this.state.secondsStart}
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
    totalRound: state.data.totalRound
  };
};

Pomodoro.propTypes = {
  incrementRound: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { incrementRound })(Pomodoro);
