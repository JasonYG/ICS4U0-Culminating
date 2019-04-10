const ParseText = require('./ParseText');
const config = require('./config.json');
const request = require('request');
const util = require('util');
const requestPromise = config => new Promise((resolve, reject) => {
  request(config, (err, res, body) => {
    if (err) return reject(err);
    resolve(body);
  });
});


/**
 * This class extracts the key terms from a block of text
 *
 * @extends ParseText
 */
class ExtractTerms extends ParseText {
  /**
   * Constructor function that creates an ExtractTerms object
   *
   * @param {string} apiKey - The SMMRY API key
   * @param {number} id - The id of the block of text
   */
  constructor(apiKey, id) {
    super();
    this.apiKey = apiKey;
    this.id = id || 1;
    this.terms = [];
  }

  /**
   * Getter method that returns the key terms
   *
   * @returns {object} - The terms array
   */
  get keyTerms() {
    return this.terms;
  }

  /**
   * Calls the Microsoft Azure API
   *
   * @returns {object} - The Microsoft Azure API's return JSON
   */
  async callApi() {
    const URL_REQUEST = "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";
    const REQUEST_KEY = "4f455c3df7184bd5a86ba47da57e4b32"; //TODO: Remove API from source code

    let config = {
      method: "POST",
      url: URL_REQUEST,
      headers: {
        "Ocp-Apim-Subscription-Key": REQUEST_KEY,
      },
      json: {
        documents: [
          {
            language: "en",
            id: "1",
            text: this.text
          }
        ]
      }
    };
    let body;
    try {
      body = await requestPromise(config);
      this.updateTerms(body);
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * Formats each term, and updates the term array
   *
   * @param {object} termsJSON - The JSON return object from the API
   */
  updateTerms(termsJSON) {


    this.terms = termsJSON.documents[0].keyPhrases.map((currentTerm) => {
      currentTerm = (currentTerm.charCodeAt(0) < 97) ? currentTerm.charAt(0) + currentTerm: currentTerm;
    }

    );
  }
  /**
   * Sorts the key terms alphabetically
   * 
   * This method will use a Quicksort algorithm to sort the terms 
   * alphabetically. In addition, bubble sort and selection sort 
   * algorithms will be implemented.
   */
  sortTerms() {
    this.terms.sort();
    console.log('The terms Array has been sorted')
  }


}

module.exports = ExtractTerms
