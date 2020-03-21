import React from "react";
import ProgressButton from "./ProgressButton";
import Timer from "./Timer";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsStart: 1500,
      secondsRemaining: 1500,
      timerOn: false,
      timerInterval: null
    };
    this.resetTimer = this.resetTimer.bind(this);
    this.timer = this.timer.bind(this);
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
            clearInterval(this.state.timerInterval);
          }
        }, 1000)
      });
      setTimeout(
        this.setState({
          timerOn: true
        }),
        1500
      );
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
        <div className="name">Freemodoro</div>
        <div className="stop">Stop</div>
        <div className="timer">
          <button data-testid="timer-display" onClick={this.resetTimer}>
            <Timer secondsRemaining={this.state.secondsRemaining} />
          </button>
        </div>
        <div className="dial"></div>
        <div className="start">
          <button
            id="svg-button"
            data-testid="timer-button"
            onClick={this.timer}
          >
            <ProgressButton
              secondsRemaining={this.state.secondsRemaining}
              secondsStart={this.state.secondsStart}
            />
          </button>
        </div>
        <div className="round">
          <div className="round-title">Round</div>
          <div className="round-data">
            <span className="footer-data-current">0</span>
            <span className="footer-data-goal">/4</span>
          </div>
        </div>
        <div className="goal">
          <div className="goal-title">Goal</div>
          <div className="goal-data">
            <span className="footer-data-current">0</span>
            <span className="footer-data-goal">/12</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
