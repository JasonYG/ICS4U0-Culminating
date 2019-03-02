/**
 * This class contains the features and functionality of a study guide
 *
 * @class
 * @return the object that has the attributes and methods for this StudyGuide object
 */
 class StudyGuide {
   /**
    * Constructor function that creates a StudyGuide object
    *
    * @constructor
    */
    constructor() {
      this.keyTerms = [];
      this.termDescriptions = {};
    }

   /**
    * Adds a term to the study guide
    *
    * @param {string} term - The term to be added
    */
    addTerm(term) {
      this.keyTerms.push(term);
    }

    /**
     * Getter method that returns the key terms
     *
     * @returns {object} - The keyTerms array
     */
     get terms() {
       return this.keyTerms;
     }

     /**
      * Getter method that returns the term descriptions
      *
      * @returns {object} - The termDescriptions object
      */
      get descriptions() {
        return this.termDescriptions;
      }

    /**
     * Adds a term description to the study guide
     */
     addDescription(term, description) {
       this.termDescriptions[term] = description;
     }

     /**
      * Creates a PDF study guide based on the object's attributes
      */
      createGuide() {
        //TODO: write the logic that creates a PDF study guide
      }
 }
