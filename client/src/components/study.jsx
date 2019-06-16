import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Study extends Component {
  state = {
    studyGuides: [],
    topic: ""
  };
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
    this.setState({ studyGuides: body.studyGuides ? body.studyGuides : [] });
    console.log(body);
  };
  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.topic);
    const getTerm = await fetch("/api/search-term", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        term: this.state.topic
      })
    });
    const body = await getTerm.json();
    console.log(body);
  };
  handleChange = e => {
    const state = { ...this.state };
    state.topic = e.currentTarget.value;
    this.setState({ topic: state.topic });
  };

  render() {
    const { studyGuides } = this.state;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("isLoggedIn ", isLoggedIn);
    if (isLoggedIn == "0") return <Redirect to="/" />;

    return (
      <React.Fragment>
        <h1 className="title">Welcome to Study4Life</h1>
        {studyGuides.length !== 0 ? (
          <h2 className="subtitle">{`You have ${
            studyGuides.length
          } study guides!`}</h2>
        ) : (
          <h2 className="subtitle">You have no study guides created!</h2>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="" className="subtitle">
              Enter a topic
            </label>
            <input
              type="text"
              placeholder="subject"
              value={this.state.topic}
              className="input topic-input"
              onChange={this.handleChange}
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Study;
