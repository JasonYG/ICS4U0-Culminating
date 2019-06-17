import React, { Component } from "react";
import Auth from "../../utilities/auth";
import { Redirect } from "react-router-dom";
import Study from "../study";
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
    if (this.state.idToken != null)
      return (
        <React.Fragment>
          <Study />
          <Redirect to={`/study/`} />
        </React.Fragment>
      );
    else
      return (
        <React.Fragment>
          <h1 className="title">Loading...</h1>
          <progress class="progress is-small is-primary" max="100">
            15%
          </progress>
        </React.Fragment>
      );
  }
}

export default Callback;
