import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Form from "./common/form";
import Loading from "./studyguide/loading";

class Study extends Component {
  state = {
    studyGuides: [],
    hasLoggedIn: false,
    topic: "",
    validTopic: true,
    organization: "hierarchical",
    breadthValue: 15,
    depthValue: 5
  };
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    if (this.state.hasLoggedIn) return;
    const getStudyGuides = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idToken: localStorage.getItem("idToken")
      })
    });

    const body = await getStudyGuides.json();
    this.setState({ studyGuides: body.studyGuides ? body.studyGuides : [] });
    console.log(body);
    this.setState({ hasLoggedIn: true });
  };
  handleBreadthChange = e => {
    this.setState({ breadthValue: e.target.value });
    console.log(e.target.value);
  };
  handleDepthChange = e => {
    this.setState({ depthValue: e.target.value });
    console.log(e.target.value);
  };
  handleTopicChange = e => {
    const state = { ...this.state };
    state.topic = e.currentTarget.value;
    this.setState({ topic: state.topic });
  };
  handleOrganizationChange = e => {
    this.setState({ organization: e.target.value });
    console.log(e.target.value);
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.topic.length === 0) {
      this.setState({ validTopic: false });
      return;
    }
    this.setState({ redirect: true });
  };
  render() {
    const { studyGuides } = this.state;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("isLoggedIn ", isLoggedIn);
    if (isLoggedIn === "0") return <Redirect to="/" />;
    if (this.state.redirect)
      return (
        <React.Fragment>
          <Redirect
            to={`/study/loading/${this.state.topic}/${
              this.state.organization
            }/${this.state.breadthValue}/${this.state.depthValue}`}
          />
        </React.Fragment>
      );
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
        <Form
          raiseChange={this.handleChange}
          label="Enter a topic"
          topic={this.state.topic}
          validTopic={this.state.validTopic}
          breadthValue={this.state.breadthValue}
          depthValue={this.state.depthValue}
          handleBreadthChange={this.handleBreadthChange}
          handleDepthChange={this.handleDepthChange}
          handleTopicChange={this.handleTopicChange}
          handleOrganizationChange={this.handleOrganizationChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

export default Study;
