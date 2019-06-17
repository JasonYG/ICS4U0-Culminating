import React, { Component } from "react";
import GuideLink from "../common/guideLink";

class Dropdown extends Component {
  state = {
    showDropDown: false,
    studyGuides: [],
    searchedTerm: "",
    displayedGuides: [],
    ascendingSort: null
  };
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    const getStudyGuides = await fetch("/api/get-study-guides", {
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
      studyGuides: body.studyGuides ? body.studyGuides : []
    });
  };
  handleDropdown = () => {
    const showDropDown = !this.state.showDropDown;
    this.setState({ showDropDown });
  };
  handleChange = e => {
    const state = { ...this.state };
    state.searchedTerm = e.currentTarget.value;
    const filteredStudyGuides = this.state.studyGuides.filter(guide =>
      guide.topic.toLowerCase().includes(state.searchedTerm)
    );
    this.setState({
      searchedTerm: state.searchedTerm,
      displayedGuides: filteredStudyGuides
    });
  };
  handleSort = () => {
    const state = { ...this.state };
    const ascendingSort =
      state.ascendingSort == null ? true : !state.ascendingSort;
    this.setState({ ascendingSort });
  };
  renderDropdown = () => {
    let studyGuides =
      this.state.searchedTerm.length > 0
        ? this.state.displayedGuides
        : this.state.studyGuides;
    if (this.state.ascendingSort != null) {
      studyGuides = studyGuides.sort((guide1, guide2) =>
        guide1.topic < guide2.topic ? 1 : -1
      );
      console.log(studyGuides);
      // if (this.state.ascendingSort)
      // sortedStudyGuides = sortedStudyGuides.reverse();
    }
    return (
      <React.Fragment>
        <div className="field is-horizontal">
          <div className="field-body">
            <p className="control has-icons-right">
              <input
                class="input"
                value={this.state.searchedTerm}
                onChange={this.handleChange}
                onClick={this.handleSort}
                type="text"
                placeholder="Find a study guide"
              />
              <span className="icon is-small is-right">
                <i
                  className={
                    "fa " +
                    (!this.state.ascendingSort
                      ? "fa-angle-down"
                      : "fa-angle-up")
                  }
                />
              </span>
            </p>
          </div>
        </div>
        <hr className="dropdown-divider" />
        {studyGuides.map(guide => (
          <GuideLink
            key={guide.topic}
            styling="dropdown-content container"
            studyGuide={guide}
            handleGuideSelect={this.props.handleGuideSelect}
            name={guide.topic}
          />
        ))}
      </React.Fragment>
    );
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
                  this.state.studyGuides.length !== 0
                    ? this.handleDropdown
                    : null
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
              {this.state.showDropDown && this.renderDropdown()}
              <div className="column is-one-third" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dropdown;
