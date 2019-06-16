import React, { Component } from "react";
import Loading from "./loading";
class ReviewGuide extends Component {
  state = {};
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    const getGuide = await fetch("/api/search-term", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        term: this.state.topic
      })
    });
    const body = await getGuide.json();
    console.log(body);
    this.setState({ finishLoading: true });
  };
  render() {
    if (this.state.finishLoading != null)
      // return <Redirect to="/study/review-guide" />;
      console.log(this.props);
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }
}

export default ReviewGuide;
