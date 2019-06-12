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
    // if (/access_token|id_token|error/.test(nextState.location.hash)) {
    await auth.handleAuthentication();
    this.setState({ idToken: auth.getIdToken() });
    // );
    // console.log("i'm here");
    // return <Link to={`/study/${auth.getIdToken()}`} />;
    // }
  };
  render() {
    // this.handleAuthentication();
    if (this.state.idToken != null)
      return <Redirect to={`/study/${this.state.idToken}`} />;
    else return <h1>loading</h1>;
  }
}

export default Callback;
