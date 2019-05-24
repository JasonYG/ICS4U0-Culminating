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
        <section className="hero  is-fullheight">
          <div className="background" />
          <div className="hero-head">
            <NavBar
              subheadings={this.state.subheadings}
              imagePath={this.state.imagePath}
            />
          </div>
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">Create a study guide today.</h1>
              <h2 class="subtitle">The Kool Kids Klub</h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
