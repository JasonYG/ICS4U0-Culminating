let ParseText = require("./back-end/ParseText");
let SummarizeText = require("./back-end/SummarizeText");
let ExtractTerms = require("./back-end/ExtractTerms");

const fs = require("fs");
/**
 * Function used to test object functionality
 */
async function main() {
  let parser = new ParseText();
  let summarizer = new SummarizeText();
  let extractor = new ExtractTerms();

  //Demonstration of polymorphism
  //let textAPIs = [summarizer, parser, extractor];

  await summarizer.callApi();
  // console.log(summarizer.summary);
}
main();
