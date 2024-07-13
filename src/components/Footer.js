import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        Built by{" "}
        <a className="footer-links" href="https://github.com/shyblumer">
          Shy Blumer (they/them)
        </a>
        {" | "}
        <a
          className="footer-links"
          href="https://github.com/shyblumer/freemodoro"
        >
          GitHub
        </a>
      </footer>
    );
  }
}

export default Footer;
