/**
 * This class extracts the important information from text
 *
 * @class
 * @return the object that has the attributes and methods for this ParseText object
 */
 class ParseText {
   /**
    * Constructor function that creates a ParseText object
    */
   constructor() {
     this.text = "";
   }

   /**
    * Getter method that returns the text that is to be parsed
    *
    * @returns {string} - The text that is to be parsed
    */
    get text() {
      return this._text;
    }

   /**
    * Setter method that changes the text to be parsed
    *
    * @param {string} text - The text to be parsed
    */
    set text(text) {
      this._text = text;
    }


 }
