const rp = require("request-promise");
const cheerio = require("cheerio");
const json = require("jsonfile");
const Summarizer = require("../SummarizeText.js");

/**
 * This is the class used to create topic objects
 * @class
 * @return the object with the information and functions for this topic object
 */

class Topic {
  /**
   * This function creates the topic object
   * @constructor
   * @param {string} title the title for this topic
   * @param {number} depth the depth of this topic that the user would like to obtain
   */
  constructor(title, breadth, depth) {
    this._title = title;
    this._breadth = breadth;
    this._depth = depth;
    this._information = [];
    this._subtopics = [];
    this._topicInfo = [];
  }

  /**
   * This function retrieves the information and subtopics for this subsection object
   * @return {string, string} an array of objects containing the subtopic/information pairs
   */
  async getInformation() {
    // Regular expression to find potential subtopics based on hyperlinks in the HTML tags
    const subtopicRegExp = /(?<=title=")(.*?)(?=\">)/g;
    // Regular expression to find and filter out references from paragraph elements
    const referenceRegExp = /\[(.*?)\]/g;

    // Get HTML source from website
    const url = `https://en.wikipedia.org/wiki/${this._title}`;
    console.log(url);
    const html = await rp(url, { timeout: 10000 });
    const $ = await cheerio.load(html);

    // Get raw HTML from paragraph elements
    $("h2 .mw-headline").each((i, elem) => {
      const id = $(elem).attr("id");
      if (
        id === "See_also" ||
        id == "Notes" ||
        id === "Further_reading" ||
        id === "References"
      )
        return false;

      const term = $(elem)
        .attr("id")
        .replace(/_/g, " ");
      const info = $(elem)
        .parent()
        .nextUntil("h2 .mw-headline", "p")
        .text()
        .trim()
        .replace(referenceRegExp, "");

      let summary = new Summarizer();
      summary.text = info;
      summary.callApi();
      const summarizedInfo = summary.summary;

      this._topicInfo.push({
        term: term,
        info: info,
        subtopics: []
      });
    });

    $("p").each((i, elem) => {
      const foundSubtopics = $(elem)
        .html()
        .match(subtopicRegExp);
      if (
        foundSubtopics != null &&
        typeof foundSubtopics[Symbol.iterator] === "function"
      ) {
        try {
          for (const s of foundSubtopics) {
            this._subtopics[s] = 1;
          }
        } catch (err) {
          console.error(err);
        }
      }
    });

    $("p").each((i, elem) => {
      const text = $(elem).text();
      for (const s in this._subtopics) {
        const regExp = new RegExp(s, "g");
        const sCount = (text.match(regExp) || []).length;
        if (sCount) {
          this._subtopics[s] += sCount;
        }
      }
    });

    this.sortTopics();

    console.log("running here");

    if (this._depth > 0) {
      for (let i = 0; i < this._breadth; i++) {
        if (i > this._topicInfo.length) continue;
        const newTopic = new Topic(
          this._topicInfo[i].term,
          this._breadth,
          this._depth - 1
        );
        const newInfo = await newTopic
          .getInformation()
          .catch(err => console.error(err));
        this._topicInfo[i].subtopics.push(newInfo);
        // this._topicInfo[i]['subtopics'].push(Math.random() * 10);
      }
    }
    // for (const section in this._topicInfo) {
    //   let summary = new Summarizer();
    //   summary.text = this._topicInfo[section].info;
    //   await summary.callApi();
    //   this._topicInfo[section].info = summary.summary;
    // }
    console.log("topicInfo", this._topicInfo);
    return {
      topic: this._title,
      content: this._topicInfo
    };

    // if (this._depth == 0) {
    //   console.log("Exit condition");
    //   return this._topicInfo;
    // } else {
    //   for (let i = 0; i < this._breadth; i++) {
    //     console.log("Recursioning");
    //     if (this._subtopics[i][0] == this._title) {
    //       i++;
    //       this._breadth++;
    //     }
    //     let newTopic = new Topic(this._subtopics[i][0], this._depth - 1);
    //     return {
    //       ...this._topicInfo,
    //       "Subtopics": await newTopic.getInformation().catch(err => console.error(err))
    //     };
    //   }
    // }
    console.log("Finished");
  }

  /**
   * A function to set the topics of this topic
   * @param {string} topics an array of topics that the user would like to set for this topic
   */
  set topics(topics) {
    this._topics = topics;
  }

  /**
   * A function to get the topics of this topic
   * @return {strings} returns an array of strings for this topic
   */
  get topics() {
    return this._topics;
  }

  /**
   * A function to sort the topics of this topic
   * @param {string} type indicates which sorting algorithm to use, by default is the default sort
   */
  sortTopics(type = "default") {
    if (type == "bubble") {
      let len = this._topics.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (this._topics[j]["value"] > this._topics[j + 1]["value"]) {
            let t = this._topics[j];
            this._topics[j + 1] = this._topics[j + 1];
            this._topics[j] = t;
          }
        }
      }
    } else if (type == "default") {
      let items = Object.keys(this._subtopics).map(key => {
        return [key, this._subtopics[key]];
      });
      items.sort((a, b) => {
        return b[1] - a[1];
      });
      this._subtopics = items;
    }
  }

  /**
   * A function to write the data of topic/information pairs onto a JSON file
   * @param {string} fileName location of JSON file to store data in
   */
  async writeToFile(fileName) {
    await json.writeToFile(fileName, this._formattedData);
  }
}

module.exports = Topic;
