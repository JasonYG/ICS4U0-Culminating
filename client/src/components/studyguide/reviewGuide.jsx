import React, { Component } from "react";
import Loading from "./loading";
class ReviewGuide extends Component {
  state = {};
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    const {
      breadthValue,
      depthValue,
      organization,
      topic
    } = this.props.match.params;
    const getGuide = await fetch("/api/search-term", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        term: topic,
        breadthValue: breadthValue,
        depthValue: depthValue,
        organization: organization
      })
    });
    const body = await getGuide.json();
    console.log(body);
    this.setState({ finishLoading: true });
  };
  render() {
    if (this.state.finishLoading != null) console.log(this.props);
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }
}

export default ReviewGuide;
