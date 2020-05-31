import React from "react";

class ProgressButton extends React.Component {
  render() {
    let radius = 44,
      stroke = 3,
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
            stroke="#D8524E"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
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
          <polygon points="33,35 33,41 55,41 55,35" fill="white" />
          <polygon points="33,47 33,53 55,53 55,47" fill="white" />
        </svg>
      );
    } else {
      // Render start button
      return (
        <svg id="svg" height={radius * 2} width={radius * 2}>
          <circle
            stroke="#D8524E"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
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
          <polygon points="33,37 55,37 44,57" fill="white" />
        </svg>
      );
    }
  }
}

export default ProgressButton;
