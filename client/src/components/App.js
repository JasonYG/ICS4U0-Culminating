import "font-awesome/css/font-awesome.css";
import "../sass/App.scss";

import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Auth from "../utilities/auth";

import About from "./info-pages/about";
import Contact from "./info-pages/contact";
import Mission from "./info-pages/mission";

import Logo from "./common/logo";
import NavBar from "./common/navbar";

import Home from "./home";
import Study from "./study";

import Callback from "./redirect-pages/callback";
import NotFound from "./redirect-pages/notFound";
import Dropdown from "./studyguide/dropdown";

const auth = new Auth();

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
        <div className="columns">
          <Route path="/study/" component={Dropdown} />
          <div className="container has-text-centered column is-one-third">
            <Switch>
              <Route path="/about/" component={About} />
              <Route path="/contact/" component={Contact} />
              <Route path="/mission/" component={Mission} />
              <Route path="/callback" component={Callback} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/study/" component={Study} />

              {this.state.isLoggedIn == "1" && (
                <Redirect from="/" to="/study/" />
              )}

              <Route
                path="/"
                exact
                render={props => <Home auth={auth} {...props} />}
              />
              <Redirect to="/not-found" />
            </Switch>
          </div>
          <Route path="/study/" render={() => <div className="column" />} />
        </div>
      </div>
    );
  }
}

export default App;
