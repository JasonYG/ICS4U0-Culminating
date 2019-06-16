import React, { Component } from "react";

class Dropdown extends Component {
  state = {
    showDropDown: false
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
              <div className={buttonClass} onClick={this.handleDropdown}>
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
              {this.state.showDropDown && (
                <React.Fragment>
                  <h2 className="dropdown-content container">Animals</h2>
                </React.Fragment>
              )}
              <div className="column is-one-third" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dropdown;
