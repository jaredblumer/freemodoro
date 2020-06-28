import React from "react";
import { connect } from "react-redux";

class ProgressButton extends React.Component {
  render() {
    let radius = 44,
      stroke = 3,
      normalizedRadius = radius - stroke * 2,
      circumference = normalizedRadius * 2 * Math.PI;

    const { onBreak, breakType } = this.props;
    // Update foreground colors
    let strokeColor, fillColor;
    if (onBreak && breakType === "short") {
      strokeColor = "#577fe7";
      fillColor = "#3b5dcc";
    } else if (onBreak && breakType === "long") {
      strokeColor = "#7b5de7";
      fillColor = "#5f3bcc";
    } else {
      strokeColor = "#D8524E";
      fillColor = "#BC3033";
    }

    const strokeDashoffset =
      circumference -
      (this.props.secondsRemaining / this.props.secondsStart) * circumference;
    if (this.props.timerOn) {
      // Render pause button
      return (
        <svg id="svg" height={radius * 2} width={radius * 2}>
          <circle
            stroke={strokeColor}
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
          <circle fill="white" cx={radius} cy={radius} r={radius - 14} />
          <polygon points="33,35 33,41 55,41 55,35" fill={fillColor} />
          <polygon points="33,47 33,53 55,53 55,47" fill={fillColor} />
        </svg>
      );
    } else {
      // Render start button
      return (
        <svg id="svg" height={radius * 2} width={radius * 2}>
          <circle
            stroke={strokeColor}
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
          <circle fill="white" cx={radius} cy={radius} r={radius - 14} />
          <polygon points="33,37 55,37 44,57" fill={fillColor} />
        </svg>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    onBreak: state.data.onBreak,
    breakType: state.data.breakType
  };
};

export default connect(mapStateToProps)(ProgressButton);
