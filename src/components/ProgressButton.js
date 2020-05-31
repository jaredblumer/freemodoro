import React from "react";

class ProgressButton extends React.Component {
  render() {
    let radius = 50,
      stroke = 4,
      normalizedRadius = radius - stroke * 2,
      circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
      circumference -
      (this.props.secondsRemaining / this.props.secondsStart) * circumference;
    if (this.props.timerOn) {
      // Render pause button
      return (
        <svg id="svg" height={radius * 2} width={radius * 2}>
          <circle
            className="progress-bar"
            stroke="white"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle fill="#f05b56" cx={radius} cy={radius} r={radius - 14} />
          <polygon points="50,50 70,50 70,55 50,55" fill="white" />
          <polygon points="50,65 70,65 70,70 50,70" fill="white" />
        </svg>
      );
    } else {
      // Render start button
      return (
        <svg id="svg" height={radius * 2} width={radius * 2}>
          <circle
            className="progress-bar"
            stroke="white"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle fill="#f05b56" cx={radius} cy={radius} r={radius - 14} />
          <polygon points="50,50 60,70 70,50" fill="white" />
        </svg>
      );
    }
  }
}

export default ProgressButton;
