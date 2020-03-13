import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="name">Freemodoro</div>
      <div className="stop">Stop</div>
      <div className="timer">
        <span>25:00</span>
      </div>
      <div className="dial"></div>
      <div className="start"></div>
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

export default App;
