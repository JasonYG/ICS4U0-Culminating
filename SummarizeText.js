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
      this.apiKey = apiKey;
      this.summarizedText = "";
    }

    /**
     * Getter method that returns the summarized text
     */
     get summary() {
       return this.summarizedText;
     }

    /**
     * Calls the SMMRY API
     *
     * @returns {object} - The SMMRY API's return JSON
     */
     callApi() {
       //TODO: write the logic to call the API
     }

     /**
      * Updates the summarized text
      *
      * @param {object} summaryJSON - The JSON return object from the API
      */
      updateSummary(summaryJSON) {
        //TODO: write the logic to parse the JSON
      }
 }
