import React, { Component } from "react";
class Form extends Component {
  //   const getTerm = await fetch("/api/search-term", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       term: this.state.topic
  //     })
  //   });
  //   const body = await getTerm.json();
  //   console.log(body);
  // };
  invalidTopic = () => {
    return (
      <React.Fragment>
        {" "}
        <div className="control has-icons-right">
          <input
            type="text"
            placeholder="subject"
            value={this.props.topic}
            className="input topic-input is-danger"
            onChange={this.props.handleTopicChange}
          />
          <span class="icon is-small is-right topic-input">
            <i class="fa fa-exclamation-triangle" />
          </span>
        </div>
        <p className="help is-danger">Please enter a valid topic</p>
      </React.Fragment>
    );
  };
  validTopic = () => {
    return (
      <input
        type="text"
        placeholder="subject"
        value={this.props.topic}
        className="input topic-input"
        onChange={this.props.handleTopicChange}
      />
    );
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="field">
          <label htmlFor="" className="subtitle">
            {this.props.label}
          </label>
          {this.props.validTopic ? this.validTopic() : this.invalidTopic()}
          <label htmlFor="" className="subtitle form-label">
            Organized
          </label>
          <div className="select">
            <select
              value={this.props.organization}
              onChange={this.props.handleOrganizationChange}
            >
              <option value="hierarchical">Hierarchical</option>
              <option value="alphabetically">Alphabetically</option>
            </select>
          </div>
          <label htmlFor="" className="subtitle form-label">
            Breadth of Study Guide
          </label>
          <input
            className="slider is-fullwidth"
            step="3"
            min="0"
            max="30"
            value={this.props.breadthValue}
            onChange={this.props.handleBreadthChange}
            type="range"
          />
          <label htmlFor="" className="subtitle form-label">
            Depth of Study Guide
          </label>
          <input
            className="slider is-fullwidth"
            step="1"
            min="0"
            max="10"
            value={this.props.depthValue}
            onChange={this.props.handleDepthChange}
            type="range"
          />
          <input
            className="button is-primary is-inverted is-outlined subtitle is-5"
            type="submit"
            value="Create a Study Guide"
          />
        </div>
      </form>
    );
  }
}

export default Form;
