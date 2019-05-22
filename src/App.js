import React, { Component } from "react";
import logo from "./logo.svg";
import NavBar from "./components/navbar";
import "./App.css";
import "bulma/css/bulma.css";

class App extends Component {
  state = {
    subheadings: ["LOGIN", "ABOUT", "CONTACT"],
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
