/**
 * This is the class used to create Website objects
 * @class
 * @return the object with the information and functions for this Website object
 */

class Website {
  this._topics = [];
  this._title;
  this._url;
  this._relevance = 0.0;

  /**
   * This function creates the Website object
   * @constructor
   */
  Website() {}

  /**
   * This function retrieves the subsections for this website object
   * @return {Subsection} an array of the subsections for this website
   */
  getSubsections() {}

  /**
   * This function returns the relevance measurement of the website
   * @return {number} the relevance for this website
   */
  getRelevance() {}

  /**
   * This function orders the given array of websites by how relevant they are
   */
  static orderByRelevance(websites) {}
}
