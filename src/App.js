import React, { Component } from "react";
import logo from "./logo.svg";
import NavBar from "./components/navbar";
import "./sass/App.scss";

class App extends Component {
  state = {
    subheadings: ["MISSION", "ABOUT", "CONTACT"],
    imagePath: "../../logo.png"
  };
  render() {
    return (
      <div className="App">
        <NavBar
          subheadings={this.state.subheadings}
          imagePath={this.state.imagePath}
        />
      </div>
    );
  }
}

export default App;
