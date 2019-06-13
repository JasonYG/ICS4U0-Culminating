import React, { Component } from "react";
import Auth from "../../utilities/auth";
import { Redirect } from "react-router-dom";
const auth = new Auth();
class Callback extends Component {
  state = {};
  componentDidMount() {
    this.handleAuthentication();
  }

  handleAuthentication = async (nextState, replace) => {
    await auth.handleAuthentication();
    this.setState({ idToken: auth.getIdToken() });
  };
  render() {
    // this.handleAuthentication();
    if (this.state.idToken != null)
      return <Redirect to={`/study/${this.state.idToken}`} />;
    else return <h1>loading</h1>;
  }
}

export default Callback;
