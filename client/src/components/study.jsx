import React, { Component } from "react";

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
    return (
      <React.Fragment>
        <h1 className="title">Future of the study page.</h1>
        <h2 className="subtitle">
          The Kool Kids Klub The Kool Kids Klub The Kool Kids Klub Klub The Kool
          Kids Klub The Kool Kids Klub
        </h2>
      </React.Fragment>
    );
  }
}

export default Study;
