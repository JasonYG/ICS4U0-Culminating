import React, { Component } from "react";
class Loading extends Component {
  state = {};
  render() {
    console.log(this.props);
    return <h1 className="title">Loading!</h1>;
  }
}

export default Loading;
