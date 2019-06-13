import React, { Component } from "react";

class Home extends Component {
  render() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return (
      <div className="home-div">
        <h1 className="title is-2">Create a study guide today.</h1>
        <h2 className="subtitle is-4">
          Choose any topic, and we'll combine information from a variety of
          sources into a succinct study guide
        </h2>
        <a
          className="button is-primary is-inverted is-outlined subtitle is-4"
          disabled={isLoggedIn == "1"}
          onClick={isLoggedIn == "1" ? null : this.props.auth.login}
        >
          Login
        </a>
        <a className="button is-primary is-inverted is-outlined subtitle is-4">
          Register
        </a>
      </div>
    );
  }
}
export default Home;
