const ParseText = require("./ParseText");
// const config = require('./config.json');
const request = require("request");
const util = require("util");
const fs = require("fs");
const requestPromise = config =>
  new Promise((resolve, reject) => {
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
    const URL_REQUEST =
      "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";
    const REQUEST_KEY = "4f455c3df7184bd5a86ba47da57e4b32"; //TODO: Remove API from source code

    let config = {
      method: "POST",
      url: URL_REQUEST,
      headers: {
        "Ocp-Apim-Subscription-Key": REQUEST_KEY
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
    // Capitalizes the first letter of each string
    this.terms = termsJSON.documents[0].keyPhrases;
    this.terms.map((currentTerm, index) => {
      if (currentTerm.charCodeAt(0) >= 97) {
        this.terms[index] =
          String.fromCharCode(currentTerm.charCodeAt(0) - 32) +
          currentTerm.substring(1);
      }
    });
  }
  /**
   * Sorts the key terms alphabetically
   *
   * This method will use a Quicksort algorithm to sort the terms
   * alphabetically. In addition, bubble sort and selection sort
   * algorithms will be implemented.
   */
  sortTerms() {
    // Default JavaScript sort
    //this.terms.sort();

    //Function that checks if a word is alphabetically before the other
    const isBefore = (wordA, wordB) => {
      for (let i = 0; i < Math.min(wordA.length, wordB.length); i++) {
        if (wordA.charCodeAt(i) < wordB.charCodeAt(i)) {
          return true;
        } else if (wordA.charCodeAt(i) > wordB.charCodeAt(i)) {
          return false;
        }
      }
      return wordA.length < wordB.length ? true : false;
    };

    const bubbleSort = wordArray => {
      let swapped = false;
      do {
        swapped = false;
        for (let i = 0; i < wordArray.length - 1; i++) {
          if (isBefore(wordArray[i + 1], wordArray[i])) {
            [wordArray[i + 1], wordArray[i]] = [wordArray[i], wordArray[i + 1]];
            swapped = true;
          }
        }
      } while (swapped);
    };
    //bubbleSort(this.terms);

    const selectionSort = wordArray => {
      let sortedArray = [];
      let unsortedArray = wordArray;

      while (unsortedArray.length > 0) {
        let minValue = unsortedArray[0];
        let minIndex = 0;
        for (let i = 1; i < unsortedArray.length; i++) {
          if (isBefore(unsortedArray[i], minValue)) {
            minValue = unsortedArray[i];
            minIndex = i;
          }
        }
        sortedArray.push(unsortedArray[minIndex]);
        unsortedArray.splice(minIndex, 1);
      }

      this.terms = sortedArray;
    };
    //selectionSort(this.terms);

    const quickSort = wordArray => {
      const partition = subArray => {
        if (subArray.length < 2) {
          return subArray;
        }
        const pivot = subArray[Math.floor(subArray.length / 2)];
        let pivotIndex = 0;
        let partitionedArray = [pivot];
        while (subArray.length > 1) {
          if (isBefore(subArray[0], pivot)) {
            partitionedArray.unshift(subArray[0]);
            pivotIndex++;
            subArray.splice(0, 1);
          } else if (pivot == subArray[0]) {
            partitionedArray.splice(
              partitionedArray.indexOf(pivot),
              0,
              subArray[0]
            );
            subArray.splice(0, 1);
            pivotIndex++;
          } else {
            partitionedArray.push(subArray[0]);
            subArray.splice(0, 1);
          }
        }
        return partition(partitionedArray.slice(0, pivotIndex))
          .concat([pivot])
          .concat(partition(partitionedArray.slice(pivotIndex + 1)));
      };
      partition(wordArray);
    };
    const mergeSort = wordArray => {
      //Base case: if an array has length <= 1, it
      //is already sorted by default
      if (wordArray.length <= 1) return wordArray;

      const middleIndex = Math.floor(wordArray.length / 2);
      let leftHalf = wordArray.slice(0, middleIndex);
      let rightHalf = wordArray.slice(middleIndex);

      leftHalf = mergeSort(leftHalf);
      rightHalf = mergeSort(rightHalf);

      const merge = (leftArr, rightArr) => {
        let mergedArray = [];

        while (leftArr.length > 0 || rightArr.length > 0) {
          const leftItem = leftArr.length > 0 ? leftArr[0] : rightArr[0] + "z";
          const rightItem =
            rightArr.length > 0 ? rightArr[0] : leftArr[0] + "z";

          if (isBefore(leftItem, rightItem)) {
            mergedArray.push(leftItem);
            leftArr = leftArr.splice(1);
          } else {
            mergedArray.push(rightItem);
            rightArr = rightArr.splice(1);
          }
        }
        return mergedArray;
      };
      return merge(leftHalf, rightHalf);
    };

    //selectionSort(this.terms);
    //quickSort(this.terms);
    //this.terms = mergeSort(this.terms);
    this.terms.sort();
  }
  /**
   * Finds the index of the given term
   *
   * This method uses a simple linear search algorithm. Returns -1
   * if the term does not exist in the term array.
   *
   * @param {string} term - The term to be found
   * @returns {number} - The index of the term.
   */
  findTerm(term) {
    //Function that checks if a word is alphabetically before the other
    const isBefore = (wordA, wordB) => {
      for (let i = 0; i < Math.min(wordA.length, wordB.length); i++) {
        if (wordA.charCodeAt(i) < wordB.charCodeAt(i)) {
          return true;
        } else if (wordA.charCodeAt(i) > wordB.charCodeAt(i)) {
          return false;
        }
      }
      return wordA.length < wordB.length ? true : false;
    };
    const linearSearch = (termsArray, term) => {
      for (let i = 0; i < termsArray.length; i++) {
        if (termsArray[i] === term) return i;
      }
      return -1;
    };
    const binarySearch = (termsArray, term) => {
      const mid = Math.floor(termsArray.length / 2);
      if (termsArray[mid] == term) return mid;
      if (termsArray.length <= 1) return -1;
      return isBefore(term, termsArray[mid])
        ? binarySearch(termsArray.splice(0, mid), term)
        : binarySearch(termsArray.splice(mid), term);
    };
    return binarySearch(this.terms, term);
  }
  /**
   * Writes the key terms to a text file
   *
   * This method uses the fs library to do file i/o
   */

  writeToFile() {
    const fileWriter = fs.createWriteStream("sortedTerms.txt");
    this.terms.forEach(term => {
      fileWriter.write(`${term}\n`);
    });
  }
}

module.exports = ExtractTerms;
