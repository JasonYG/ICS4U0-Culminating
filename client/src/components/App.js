import "font-awesome/css/font-awesome.css";
import "../sass/App.scss";

import React, { Component } from "react";

import Logo from "./common/logo";
import NavBar from "./common/navbar";

import MainContent from "./mainContent";

class App extends Component {
  componentDidMount() {
    const expiresAt = localStorage.getItem("expiresAt");
    if (expiresAt < new Date().getTime()) {
      localStorage.clear();
      localStorage.setItem("isLoggedIn", "0");
    }
    this.setState({ isLoggedIn: localStorage.getItem("isLoggedIn") });
  }
  state = {
    subheadings: ["MISSION", "ABOUT", "CONTACT"],
    imagePath: require("../images/logo.png"),
    logoComponent: <Logo imagePath={require("../images/logo.png")} />,
    isLoggedIn: localStorage.getItem("isLoggedIn")
  };

  render() {
    return (
      <div className="App">
        <div className="background" />
        <div className="hero-head">
          <NavBar
            subheadings={this.state.subheadings}
            imagePath={this.state.imagePath}
            appTitle={"Study4Life"}
            logoComponent={this.state.logoComponent}
          />
        </div>
        <MainContent />
      </div>
    );
  }
}

export default App;
