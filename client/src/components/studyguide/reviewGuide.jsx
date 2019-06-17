import React, { Component } from "react";
import Loading from "./loading";
import StudyGuide from "./studyGuide";

class ReviewGuide extends Component {
  state = {
    finishLoading: false,
    studyGuide: {
      topic: "Animal",
      content: [
        {
          term: "Ethymology",
          info: "Information about it",
          subtopics: [
            {
              term: "1",
              info: "Information about it",
              subtopics: [
                { term: "3", info: "Information about it", subtopics: [] },
                { term: "4", info: "Information about it", subtopics: [] }
              ]
            },
            { term: "2", info: "Information about it", subtopics: [] }
          ]
        },
        { term: "Mammals", info: "Information about it", subtopics: [] }
      ]
    }
  };
  componentDidMount() {
    if (this.props.currentGuide == null) this.callApi();
  }
  callApi = async () => {
    console.log("here");
    const {
      breadthValue,
      depthValue,
      organization,
      topic
    } = this.props.match.params;
    const getGuide = await fetch("/api/search-term", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        term: topic,
        breadthValue: breadthValue,
        depthValue: depthValue,
        organization: organization
      })
    });
    const body = await getGuide.json();
    console.log(body);
    this.setState({ studyGuide: body, finishLoading: true });
  };
  handleDelete = () => {
    this.props.history.replace("/study/");
  };
  handleBack = () => {
    this.props.history.replace("/study/");
  };
  handleSave = async () => {
    const saveGuide = await fetch("/api/save-guide", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idToken: localStorage.getItem("idToken"),
        studyGuide: this.state.studyGuide
      })
    });
    const body = await saveGuide.json();

    this.props.history.replace("/study/");
  };
  render() {
    if (this.props.currentGuide != null)
      return (
        <StudyGuide
          onDelete={this.handleDelete}
          //TODO: Implement delete
          onBack={this.handleBack}
          guide={this.props.currentGuide}
        />
      );
    if (this.state.finishLoading != null) {
      return (
        <StudyGuide
          onDelete={this.handleDelete}
          onSave={this.handleSave}
          guide={this.state.studyGuide}
        />
      );
    }
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }
}

export default ReviewGuide;
