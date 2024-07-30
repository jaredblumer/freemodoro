import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        Built by{" "}
        <a className="footer-links" href="https://github.com/shyblumer">
          Jared Blumer
        </a>
        {" | "}
        <a
          className="footer-links"
          href="https://github.com/jaredblumer/freemodoro"
        >
          GitHub
        </a>
      </footer>
    );
  }
}

export default Footer;
