import React, { Component } from "react";
import SignIn from "./common/signIn";

class Home extends Component {
  handleAuth = () => this.props.auth.login();
  render() {
    const isLoggedIn = 0;
    return (
      <div className="home-div">
        <h1 className="title is-2">Create a study guide today.</h1>
        <h2 className="subtitle is-4">
          Choose any topic, and we'll combine information from a variety of
          sources into a succinct study guide
        </h2>
        <SignIn onClick={this.handleAuth} />
      </div>
    );
  }
}
export default Home;
