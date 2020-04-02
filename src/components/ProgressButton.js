import React from "react";

class ProgressButton extends React.Component {
  render() {
    let radius = 60,
      stroke = 4,
      normalizedRadius = radius - stroke * 2,
      circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
      circumference -
      (this.props.secondsRemaining / this.props.secondsStart) * circumference;

    return (
      <svg id="svg" height={radius * 2} width={radius * 2}>
        <circle
          className="progress-bar"
          stroke="black"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle fill="green" cx={radius} cy={radius} r={radius - 14} />
        <polygon points="50,50 60,70, 70,50" />
      </svg>
    );
  }
}

export default ProgressButton;
