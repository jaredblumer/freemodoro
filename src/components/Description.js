import React from "react";

class Description extends React.Component {
  render() {
    return (
      <div className="description-container">
        <h1>
        Improve Your Focus and Boost Your Productivity With This Free and Open Source Pomodoro Timer
        </h1>
        <h2>What is a Pomodoro Timer?</h2>
        <p>
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo. The technique uses a timer to break down work into
          intervals, traditionally 25 minutes, separated by short breaks of five
          minutes. Each interval is known as a pomodoro, named after a
          tomato-shaped kitchen timer that Cirillo used as a student. Research
          has shown that our brains aren't built to focus for hours at a time,
          and the most effective method to refresh attention spans is to take a
          break.
        </p>
        <h2>How long should each Pomodoro and break last?</h2>
        <p>
          The traditional Pomodoro Technique recommends 25 minutes of work
          followed by a five minute break. After completing four work periods,
          you take a longer break of 15 to 30 minutes.
        </p>

        <p>
          A recent study conducted by the Draugiem Group found that the most
          productive employees were those whose work-to-break ratio was 52
          minutes of work, followed by 17 minutes of rest. If 25:5 Pomodoros
          don't work best for you, give a 52:17 a shot. You can change your
          round and break settings using the Settings button above.
        </p>
      </div>
    );
  }
}

export default Description;
