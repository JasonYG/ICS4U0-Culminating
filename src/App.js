import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from "./components/navbar";
import Home from "./components/home";

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
          <Router>
            <div className="background" />
            <div className="hero-head">
              <NavBar
                subheadings={this.state.subheadings}
                imagePath={this.state.imagePath}
              />
            </div>
            <div className="hero-body">
              <div className="container has-text-centered">
                <Route path="/" component={Home} />
              </div>
            </div>
          </Router>
        </section>
      </div>
    );
  }
}

export default App;
