import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Study extends Component {
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    const response = await fetch("/api/test");
    const test = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idToken: localStorage.getItem("idToken")
      })
    });

    const body = await test.json();
    console.log(body);
  };
  render() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("isLoggedIn ", isLoggedIn);
    if (isLoggedIn == "0") return <Redirect to="/" />;

    return (
      <React.Fragment>
        <h1 className="title">Future of the study page.</h1>
        <h2 className="subtitle">Placeholder Text</h2>
      </React.Fragment>
    );
  }
}

export default Study;
