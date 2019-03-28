const ParseText = require('./ParseText');
const config = require('./config.json');

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
       return this._keyTerms;
     }

     /**
      * Calls the Microsoft Azure API
      *
      * @returns {object} - The Microsoft Azure API's return JSON
      */
      callApi() {
        const URL_LINK = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";
        const REQUEST_KEY = ""; //TODO: Sign up for Microsoft Azure API
        //TODO: write the logic to call the API
        console.log("The Microsoft Azure API will be implemented soon");
      }

      /**
       * Updates the key term
       *
       * @param {object} termsJSON - The JSON return object from the API
       */
       updateTerms(termsJSON) {
         //TODO: write the logic to parse the JSON
       }
 }

 module.exports = ExtractTerms
