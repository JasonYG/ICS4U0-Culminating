const ParseText = require('./ParseText');
const config = require('./config.json');
const request = require('request');
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
        request(config, (error, response, body) => {
          console.log(body);
        });
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
