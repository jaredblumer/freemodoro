import React from "react";

class ProgressTemplate extends React.Component {
  constructor(props) {
    super(props);
    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, progress, minutes } = this.props;

    const strokeDashoffset =
      this.circumference - (progress / (minutes * 60)) * this.circumference;

    return (
      <button id="svg-button">
        <svg id="svg" height={radius * 2} width={radius * 2}>
          <circle
            className="progress-bar"
            stroke="black"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={this.circumference + " " + this.circumference}
            style={{ strokeDashoffset }}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </button>
    );
  }
}

class ProgressButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: this.props.minutes * 60
    };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({ progress: this.state.progress - 1 });
      if (this.state.progress === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  render() {
    return (
      <ProgressTemplate
        radius={60}
        stroke={4}
        progress={this.state.progress}
        minutes={this.props.minutes}
      />
    );
  }
}

export default ProgressButton;
