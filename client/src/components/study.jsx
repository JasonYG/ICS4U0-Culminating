import React, { Component } from "react";
import { async } from "q";

class Study extends Component {
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    const response = await fetch("/api/test");
    const body = await response.json();
    console.log(body);
  };
  render() {
    return (
      <React.Fragment>
        <h1 className="title">Future of the study page.</h1>
        <h2 className="subtitle">
          The Kool Kids Klub The Kool Kids Klub The Kool Kids Klub The Kool Kids
          Klub The Kool Kids Klub The Kool Kids Klub The Kool Kids Klub The Kool
          Kids Klub The Kool Kids Klub The Kool Kids Klub The Kool Kids Klub The
          Kool Kids Klub The Kool Kids Klub
        </h2>
      </React.Fragment>
    );
  }
}

export default Study;
