let ParseText = require("./ParseText");
let SummarizeText = require("./SummarizeText");
let ExtractTerms = require("./ExtractTerms");
/**
  * Function used to test object functionality
  */
function main() {
  let parser = new ParseText();
  let summarizer = new SummarizeText();
  let extractor = new ExtractTerms();

  let textAPIs = [parser, summarizer, extractor];
  textAPIs.forEach(api => {
    api.text = "This API is working correctly";
    if (typeof api.callApi === 'function') api.callApi();
  });

}
main();
