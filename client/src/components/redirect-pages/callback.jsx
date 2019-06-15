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
    else return <h1>loading</h1>;
  }
}

export default Callback;
