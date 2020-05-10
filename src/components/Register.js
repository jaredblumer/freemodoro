import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordVerification: "",
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handlePasswordChange(event) {
    const { value } = event.target;
    let lowercase = document.getElementById("lowercase");
    let uppercase = document.getElementById("uppercase");
    let number = document.getElementById("number");
    let symbol = document.getElementById("symbol");
    let length = document.getElementById("length");

    // Validate lowercase letters
    let lowercaseLetters = /[a-z]/g;
    if (value.match(lowercaseLetters)) {
      lowercase.classList.remove("invalid");
      lowercase.classList.add("valid");
    } else {
      lowercase.classList.remove("valid");
      lowercase.classList.add("invalid");
    }

    // Validate uppercase letters
    let uppercaseLetters = /[A-Z]/g;
    if (value.match(uppercaseLetters)) {
      uppercase.classList.remove("invalid");
      uppercase.classList.add("valid");
    } else {
      uppercase.classList.remove("valid");
      uppercase.classList.add("invalid");
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if (value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate symbol
    let symbols = /(?=.*[!@#$%^&*-])/;
    if (value.match(symbols)) {
      symbol.classList.remove("invalid");
      symbol.classList.add("valid");
    } else {
      symbol.classList.remove("valid");
      symbol.classList.add("invalid");
    }

    // Validate length
    if (value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }

    this.setState({
      password: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    let password = this.state.password;
    let passwordVerification = this.state.passwordVerification;

    let lowercaseLetters = /[a-z]/g;
    let uppercaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let symbols = /(?=.*[!@#$%^&*-])/;

    if (password !== passwordVerification) {
      alert("Passwords must match.");
    }

    // Validate password
    if (
      password === passwordVerification &&
      password.match(lowercaseLetters) &&
      password.match(uppercaseLetters) &&
      password.match(numbers) &&
      password.match(symbols)
    ) {
      let body = {
        email: this.state.email,
        password: this.state.password
      };
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ redirect: true });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert("Error registering. Please try again.");
        });
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>Register</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required
          />
          <br />
          <input
            type="password"
            name="passwordVerification"
            placeholder="Verify Password"
            value={this.state.passwordVerification}
            onChange={this.handleChange}
            required
          />
          <br />
          <div className="password">
            <h2>Password must contain the following:</h2>
            <p id="lowercase" className="invalid">
              A lowercase letter.
            </p>
            <p id="uppercase" className="invalid">
              An uppercase letter.
            </p>
            <p id="number" className="invalid">
              A number.
            </p>
            <p id="symbol" className="invalid">
              A symbol.
            </p>
            <p id="length" className="invalid">
              At least 8 characters.
            </p>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <p>
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    );
  }
}
