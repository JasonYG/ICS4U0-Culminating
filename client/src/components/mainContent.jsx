import React, { Component } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Auth from "../utilities/auth";

import About from "./info-pages/about";
import Contact from "./info-pages/contact";
import Mission from "./info-pages/mission";

import Home from "./home";
import Study from "./study";

import Callback from "./redirect-pages/callback";
import NotFound from "./redirect-pages/notFound";
import Dropdown from "./studyguide/dropdown";
import ReviewGuide from "./studyguide/reviewGuide";

const auth = new Auth();

class MainContent extends Component {
  state = {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    creatingGuide: localStorage.getItem("creatingGuide") || false,
    createdStudyGuide: false,
    currentGuide: null
  };
  handleCreation = () => {
    this.setState({ createdStudyGuide: true });
  };
  handleGuideSelect = guide => {
    this.setState({ currentGuide: guide });
    this.props.history.replace(`/study/review/${guide.topic}`);
  };
  render() {
    this.state.createdStudyGuide = this.props.location.pathname.includes(
      "/study/review/"
    );

    const columnStyling =
      "container column  " +
      (this.state.createdStudyGuide
        ? "is-half"
        : "main-column has-text-centered is-one-third");
    return (
      <div className="columns">
        <Route
          exact
          path="/study/"
          render={props => (
            <Dropdown {...props} handleGuideSelect={this.handleGuideSelect} />
          )}
        />
        <div className={columnStyling}>
          <Switch>
            <Route path="/about/" component={About} />
            <Route path="/contact/" component={Contact} />
            <Route path="/mission/" component={Mission} />
            <Route path="/callback" component={Callback} />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/study/review/:topic/:organization/:breadthValue/:depthValue"
              render={props => (
                <ReviewGuide onCreation={this.handleCreation} {...props} />
              )}
            />
            <Route
              path="/study/review/:topic"
              render={props => (
                <ReviewGuide
                  onCreation={this.handleCreation}
                  {...props}
                  currentGuide={this.state.currentGuide}
                />
              )}
            />

            <Route path="/study/" component={Study} />

            {this.state.isLoggedIn === "1" && (
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
        <Route exact path="/study/" render={() => <div className="column" />} />
      </div>
    );
  }
}

export default MainContent;
