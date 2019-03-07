const ParseText = require('./ParseText');

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
      this.keyTerms = [];
    }

    // /**
    //  * Getter method that returns the key terms
    //  *
    //  * @returns {object} - The terms array
    //  */
    //  get keyTerms() {
    //    return this._keyTerms;
    //  }

     /**
      * Calls the Microsoft Azure API
      *
      * @returns {object} - The Microsoft Azure API's return JSON
      */
      callApi() {
        //TODO: write the logic to call the API
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
