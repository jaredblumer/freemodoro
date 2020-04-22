import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    );
  }
}

export default Settings;

// Pomodoro.propTypes = {
//   incrementRound: PropTypes.func.isRequired
// };
// export default connect(mapStateToProps, { incrementRound })(Pomodoro);
