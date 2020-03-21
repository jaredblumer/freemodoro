import React from "react";

class Timer extends React.Component {
  timerDisplay(secondsRemaining) {
    let minutes = Math.floor(secondsRemaining / 60);
    let seconds = secondsRemaining - minutes * 60;
    const zeroPad = num => {
      return String(num).padStart(2, "0");
    };
    return zeroPad(minutes) + ":" + zeroPad(seconds);
  }

  render() {
    return (
      <span data-testid="timerDisplay">
        {this.timerDisplay(this.props.secondsRemaining)}
      </span>
    );
  }
}

export default Timer;
