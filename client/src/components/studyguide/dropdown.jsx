import React, { Component } from "react";
import GuideLink from "../common/guideLink";

class Dropdown extends Component {
  state = {
    showDropDown: false,
    studyGuides: []
  };
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    const getStudyGuides = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idToken: localStorage.getItem("idToken")
      })
    });

    const body = await getStudyGuides.json();
    this.setState({
      studyGuides: body.studyGuides
        ? body.studyGuides
        : [{ name: "Animal" }, { name: "Math" }]
    });
    console.log(body);
  };
  handleDropdown = () => {
    const showDropDown = !this.state.showDropDown;
    this.setState({ showDropDown });
  };
  render() {
    const buttonClass =
      "button is-link is-inverted is-outlined " +
      (this.state.showDropDown ? "is-active" : "");
    return (
      <React.Fragment>
        <div className="column is-one-third dropdown has-text-centered">
          <div className="columns">
            <div className="column is-two-thirds">
              <div
                className={buttonClass}
                disabled={this.state.studyGuides.length === 0}
                onClick={
                  this.state.studyGuides.length > 0 ? this.handleDropdown : null
                }
              >
                <span>Saved Study Guides</span>
                <span className="icon is-small">
                  <i
                    className={
                      "fa " +
                      (!this.state.showDropDown
                        ? "fa-angle-down"
                        : "fa-angle-up")
                    }
                  />
                </span>
              </div>
              {this.state.showDropDown &&
                this.state.studyGuides.map(guide => (
                  <GuideLink
                    key={guide.name}
                    styling="dropdown-content container"
                    handleGuideSelect={null}
                    name={guide.name}
                  />
                ))}
              <div className="column is-one-third" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dropdown;
