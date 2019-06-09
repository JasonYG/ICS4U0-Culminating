import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from "./components/navbar";
import Home from "./components/home";
import Mission from "./components/mission";
import About from "./components/about";
import Contact from "./components/contact";
import Study from "./components/study";
import { Switch } from "react-router-dom";
import Auth from "./utilities/auth";
import history from "./utilities/history";
import "./sass/App.scss";
const auth = new Auth();

class App extends Component {
  state = {
    subheadings: ["MISSION", "ABOUT", "CONTACT"],
    imagePath: "../../logo.png"
  };
  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication().then(() => {
        console.log(auth.getAccessToken());
        history.replace(`/study/${auth.getIdToken()}`);
      });
    }
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
          <div className="hero-body">
            <div className="container has-text-centered">
              <Switch>
                <Route path="/about/" component={About} />
                <Route path="/contact/" component={Contact} />
                <Route path="/mission/" component={Mission} />
                <Route path="/study/:idToken?" component={Study} />
                <Route path="/callback/" render={this.handleAuthentication} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
