const rp = require('request-promise');
const cheerio = require('cheerio');
const json = require('jsonfile');

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
  Topic(title, depth) {
    this._title = title;
    this._depth = depth;
    this._information = new Array();
    this._topics = new Array();
    this._formattedData = {};
  }

  /**
   * This function retrieves the information and subtopics for this subsection object
   * @return {string, string} an array of objects containing the subtopic/information pairs
   */
  async getInformation() {
    // Regular expression to find potential subtopics based on hyperlinks in the HTML tags
    const subtopicRegExp = new RegExp('(?<=title=")(.*?)(?=\">)', 'g');
    // Regular expression to find and filter out references from paragraph elements
    const referenceRegExp = new RegExp('(?<=[)(.*?)(?=\])', 'g');

    // Get HTML source from website
    const url = `https://en.wikipedia.org/wiki/${this._title}`;
    const html = await rp(url);
    const page = await cheerio.load(html);

    // Get raw HTML from paragraph elements
    const tags = page('p').map((i, elem) => {
      return page(this).html();
    }).get();

    let subtopics = [];

    for (const tag of tags) {
      let temp = tag.match(subtopicRegExp);
      if (temp != null) {
        for (const t of temp) {
          if (subtopics[t]) {
            subtopics[t] += 1;
          } else {
            subtopics[t]
            subtopics[t] = 1;
          }
        }
      }
    }

    // Get raw text from paragraph elements
    const paragraphs = page('p').map((i, elem) => {
      return page(this).text();
    }).get();

    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i] = paragraphs[i].replace(referenceRegExp, '');
      if (paragraphs[i].length > 1) {
        this._information.push(paragraphs[i]);
      }
    }

    this._topics = this._topics.concat(subtopics);
    this.sortTopics();

    let package = [];
    for (let i = 0; i < topics.length; i++) {
      package.push({
        'topic': this._topics[i],
        'information': this._information[i]
      })
    }

    if (this._depth = 0) {
      this._formattedData = package;
      return this._formattedData;;
    } else {
      let packagePlus = [];
      for (let i = 0; i < this._depth; i++) {
        let st = new Topic(package[i].topic, this._depth - 1);
        packagePlus.concat(st.getInformation());
      }
      this._formattedData = package.concat(packagePlus);
      return this._formattedData;;
    }
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
  sortTopics(type = 'default') {
    if (type == 'bubble') {
      let len = this._topics.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (this._topics[j]['value'] > this._topics[j + 1]['value']) {
            let t = this._topics[j];
            this._topics[j + 1] = this._topics[j + 1];
            this._topics[j] = t;
          }
        }
      }
    } else if (type == 'default') {
      let topics = Object.keys(this._topics);
      let i, length = topics.length;
      topics.sort();
      let sortedTopics = [];
      for (i = 0; i < len; i++) {
        let t = topics[i];
        sortedTopics.push({
          'topic': t,
          'value':this._topics[t]
        });
      }
      this._topics = sortedTopics;
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
