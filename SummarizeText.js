let ParseText = require("./ParseText");
let request = require("request");
const config = require('./config.json');
/**
 * This class summarizes the important information from a block of text
 *
 * @extends ParseText
 */
 class SummarizeText extends ParseText {
   /**
    * Constructor function that creates a SummarizeText object
    *
    * @param {number} numberOfSentences - The number of sentences of the summary
    * @param {string} apiKey - The SMMRY API key
    */
    constructor(numberOfSentences, apiKey) {
      super();
      this.numberOfSentences = numberOfSentences || 7;
      this.apiKey = config.API_KEY;
      this.summarizedText = "";
    }

    /**
     * Getter method that returns the summarized text
     */
     get summary() {
       console.log(this.summarizedText);
       return this.summarizedText;
     }
    
    /**
     * Calls the SMMRY API
     *
     * This code was written in consultation with a pre-existing node
     * module, node-smmry. The link to their repository can be found here:
     * https://github.com/dantheuber/node-smmry.
     *
     * @returns {object} - The SMMRY API's return JSON
     */
     callApi() {
       //API request parameters
       const PARAMETERS = {
         SM_API_KEY: "4C039A6343", //TODO: Remove API from source code
         SM_URL: "https://www.theguardian.com/world/2019/mar/07/north-korea-film-focuses-on-kim-jong-un-donald-trump-relationship-not-hanoi-summit-breakdown",
        // SM_LENGTH=N	 ,
        // SM_KEYWORD_COUNT=N,
        // SM_WITH_ENCODE: "",
        // SM_WITH_BREAK: "",
        // SM_IGNORE_LENGTH: "",
        // SM_QUOTE_AVOID: "",
        // SM_QUESTION_AVOID: "",
        // SM_EXCLAMATION_AVOID: "",
       };

       //Build URL with appropriate parameters
       const URL_REQUEST = Object.keys(PARAMETERS)
        .reduce((acc, val) => `${acc}&${val}=${PARAMETERS[val]}`, "https://api.smmry.com?");

       //TODO: write the logic to call the API
      // const URL = 'https://api.smmry.com';
       let config = {
        method: 'POST',
        url: URL_REQUEST,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Expect: ''
        },
        form: {
          sm_api_input: this.text,
        },
        json: true,
       };

       request(config, (error, response, body) => {
         this.updateSummary(body);
       });
     }

     /**
      * Updates the summarized text
      *
      * @param {object} summaryJSON - The JSON return object from the API
      */
      updateSummary(summaryJSON) {
        this.summarizedText = summaryJSON.sm_api_content;
        (this.summarizedText) ? console.log('The SMMRY API is working') : console.log('The SMMRY API is not working');
        //TODO: write the logic to parse the JSON
      }
 }
module.exports = SummarizeText;
