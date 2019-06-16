import React, { Component } from "react";
import SignIn from "./common/signIn";

class Home extends Component {
  handleAuth = () => this.props.auth.login();
  render() {
    const isLoggedIn = 0;
    return (
      <React.Fragment>
        <h1 className="title">Create a study guide today.</h1>
        <h2 className="subtitle">
          Choose any topic, and we'll combine information from a variety of
          sources into a succinct study guide
        </h2>
        <SignIn onClick={this.handleAuth} />
      </React.Fragment>
    );
  }
}
export default Home;
