import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from "./navbar";
import Home from "./home";
import Mission from "./info-pages/mission";
import About from "./info-pages/about";
import Contact from "./info-pages/contact";
import Study from "./study";
import { Switch, Redirect } from "react-router-dom";
import Auth from "../utilities/auth";
import Callback from "./redirect-pages/callback";
import history from "../utilities/history";
import "../sass/App.scss";
import NotFound from "./redirect-pages/notFound";
const auth = new Auth();

class App extends Component {
  componentDidMount() {
    const expiresAt = localStorage.getItem("expiresAt");

    if (expiresAt < new Date().getTime()) {
      localStorage.clear();
      localStorage.setItem("isLoggedIn", "0");
    }
  }
  state = {
    subheadings: ["MISSION", "ABOUT", "CONTACT"],
    imagePath: require("../images/logo.png")
  };
  handleAuthentication = async (nextState, replace) => {
    let so;
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication().then(() => {
        history.push(`/study/${auth.getIdToken()}`);
      });
    }
  };
  render() {
    return (
      <div className="App">
        <section className="hero is-fullheight">
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
                <Route
                  path="/study"
                  render={() => <Study idToken={auth.getIdToken()} />}
                />
                <Route path="/callback" component={Callback} />
                <Route path="/not-found" component={NotFound} />
                <Route
                  path="/"
                  exact
                  render={props => <Home auth={auth} {...props} />}
                />
                <Redirect to="/not-found" />
              </Switch>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
