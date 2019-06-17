import React, { Component } from "react";
class StudyGuide extends Component {
  parseStudyGuide = () => {
    const { guide } = this.props;
    return guide.content.map(section => {
      const recursivelyObtainTopics = section => {
        if (section == null || section.length === 0) {
          return;
        }
        const { term, info, subtopics } = section;
        return (
          <React.Fragment>
            <h2 className="subtitle form-label has-text-centered is-3">
              {term}
            </h2>
            <p className="subtitle form-label">{info}</p>
            {subtopics != null &&
              subtopics.map(topic => recursivelyObtainTopics(topic))}
          </React.Fragment>
        );
      };
      return recursivelyObtainTopics(section);
    });
  };

  render() {
    const { guide } = this.props;
    return (
      <React.Fragment>
        <h1 className="title has-text-centered">{guide.topic}</h1>
        {this.parseStudyGuide()}
        <div className="columns">
          <div className="column is-half">
            {this.props.onBack == null ? (
              <a
                className="button is-primary is-inverted is-outlined subtitle is-4 is-fullwidth"
                onClick={this.props.onSave}
              >
                Save
              </a>
            ) : (
              <a
                className="button is-primary is-inverted is-outlined subtitle is-4 is-fullwidth"
                onClick={this.props.onBack}
              >
                Back
              </a>
            )}
          </div>
          <div className="column is-half">
            <a
              className="button is-primary is-inverted is-outlined subtitle is-4 is-fullwidth"
              onClick={this.props.onDelete}
            >
              Delete
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudyGuide;
