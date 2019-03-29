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

  summarizer.callApi();
  let textAPIs = [parser, summarizer, extractor];
  // textAPIs.forEach(api => {
  //   api.text = "This API is working correctly";
  //   if (typeof api.callApi === 'function') api.callApi();
  // });
  console.log(summarizer.summarizedText);
  // console.log(textAPIs[2].text);
  // textAPIs[2].callApi();
}
main();
