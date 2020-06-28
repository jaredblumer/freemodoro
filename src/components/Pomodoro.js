import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProgressButton from "./ProgressButton";
import Timer from "./Timer";
import {
  incrementRound,
  toggleBreak,
  toggleShortBreak,
  toggleLongBreak,
  togglePomodoro
} from "../actions/timerActions";

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
    this.handleShortBreakButton = this.handleShortBreakButton.bind(this);
    this.handleLongBreakButton = this.handleLongBreakButton.bind(this);
    this.handlePomodoroButton = this.handlePomodoroButton.bind(this);
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
      if (this.props.breakType === "short") {
        return this.props.shortBreakLength;
      } else {
        return this.props.longBreakLength;
      }
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

  async handleShortBreakButton() {
    await this.props.toggleShortBreak();
    this.setState({
      secondsRemaining: this.determineSecondsStart(),
      timerOn: false
    });
    clearInterval(this.state.timerInterval);
  }

  async handleLongBreakButton() {
    await this.props.toggleLongBreak();
    this.setState({
      secondsRemaining: this.determineSecondsStart(),
      timerOn: false
    });
    clearInterval(this.state.timerInterval);
  }

  async handlePomodoroButton() {
    await this.props.togglePomodoro();
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
              // Set up break
              // document.body.style.backgroundColor = "#CC3C3B";

              this.props.incrementRound();
              this.props.toggleBreak(); // Turn break on
              this.setState({
                secondsRemaining: this.determineSecondsStart()
              });
            } else {
              // Set up active round
              this.props.toggleBreak();
              // document.body.style.backgroundColor = "white";
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

  componentDidMount() {
    const { onBreak, breakType } = this.props;
    let pomodoroButton = document.getElementById("pomodoro-button"),
      shortBreakButton = document.getElementById("short-break-button"),
      longBreakButton = document.getElementById("long-break-button");

    if (onBreak && breakType === "short") {
      shortBreakButton.classList.add("button-active");
    } else if (onBreak && breakType === "long") {
      longBreakButton.classList.add("button-active");
    } else {
      pomodoroButton.classList.add("button-active");
    }
  }

  render() {
    const { onBreak, breakType } = this.props;

    // Update foreground colors
    let foreground = "color-pomodoro";
    if (onBreak && breakType === "short") {
      foreground = "color-short-break";
    } else if (onBreak && breakType === "long") {
      foreground = "color-long-break";
    } else {
      foreground = "color-pomodoro";
    }

    let pomodoroButton = document.getElementById("pomodoro-button"),
      shortBreakButton = document.getElementById("short-break-button"),
      longBreakButton = document.getElementById("long-break-button");

    if (shortBreakButton && onBreak && breakType === "short") {
      shortBreakButton.classList.add("button-active");
    } else if (longBreakButton && onBreak && breakType === "long") {
      longBreakButton.classList.add("button-active");
    } else if (pomodoroButton) {
      pomodoroButton.classList.add("button-active");
    }

    // Update background colors
    if (onBreak && breakType === "short") {
      let containers = document.getElementsByClassName("container");
      for (let i = 0; i < containers.length; i++) {
        containers[i].classList.remove("container-long-break");
        containers[i].classList.add("container-short-break");
      }
    } else if (onBreak && breakType === "long") {
      let containers = document.getElementsByClassName("container");
      for (let i = 0; i < containers.length; i++) {
        containers[i].classList.remove("container-short-break");
        containers[i].classList.add("container-long-break");
      }
    } else {
      let containers = document.getElementsByClassName("container");
      for (let i = 0; i < containers.length; i++) {
        containers[i].classList.remove("container-short-break");
        containers[i].classList.remove("container-long-break");
      }
    }

    return (
      <div className="Pomodoro">
        <header>
          <div className="name">
            <h1>Freemodoro</h1>
          </div>
          <div className="menu">
            <Link to="/Settings">
              <button className={foreground}>Settings</button>
            </Link>
            <Link to="/Login">
              <button className={foreground}>Login</button>
            </Link>
          </div>
        </header>
        <div id="display" className={foreground}>
          <div className="round-type">
            <button
              id="pomodoro-button"
              className={foreground}
              onClick={this.handlePomodoroButton}
            >
              Pomodoro
            </button>
            <button
              id="short-break-button"
              className={foreground}
              onClick={this.handleShortBreakButton}
            >
              Short Break
            </button>
            <button
              id="long-break-button"
              className={foreground}
              onClick={this.handleLongBreakButton}
            >
              Long Break
            </button>
          </div>
          <div className="timer">
            <button
              className={foreground}
              data-testid="timer-display"
              onClick={this.resetTimer}
            >
              <Timer secondsRemaining={this.state.secondsRemaining} />
            </button>
          </div>
          <div className="data">
            <div className="round">
              <div className="round-title">Round</div>
              <div className="round-data">
                <span
                  className="footer-data-current"
                  data-testid="currentRound"
                >
                  {this.props.currentRound}
                </span>
                <span className="footer-data-goal">
                  /{this.props.totalRound}
                </span>
              </div>
            </div>
            <div className="start">
              <button
                id="svg-button"
                data-testid="timer-button"
                className={foreground}
                onClick={this.timer}
              >
                <ProgressButton
                  secondsRemaining={this.state.secondsRemaining}
                  secondsStart={this.determineSecondsStart()}
                  timerOn={this.state.timerOn}
                />
              </button>
            </div>
            <div className="goal">
              <div className="goal-title">Goal</div>
              <div className="goal-data">
                <span className="footer-data-current">
                  {this.props.currentGoal}
                </span>
                <span className="footer-data-goal">
                  /{this.props.totalGoal}
                </span>
              </div>
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
    breakType: state.data.breakType,
    shortBreakLength: state.data.shortBreakLength,
    longBreakLength: state.data.longBreakLength,
    roundLength: state.data.roundLength
  };
};

Pomodoro.propTypes = {
  incrementRound: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  incrementRound,
  toggleBreak,
  toggleShortBreak,
  toggleLongBreak,
  togglePomodoro
})(Pomodoro);
