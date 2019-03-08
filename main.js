let ParseText = require("./ParseText");
let SummarizeText = require("./SummarizeText");
let ExtractTerms = require("./ExtractTerms");
/**
  * Function used to test object functionality
  */
function main() {
  // let x = new StudyGuide();
  // x.addTerm("mitosis");
  //console.log(x.descriptions);

  let y = new ParseText();
  y.text = "hello world";
  //console.log(y.text);

  let z = new SummarizeText();
  z.text = `summarize text`;
  z.callApi();

  let a = new ExtractTerms();
  a.text = `extract this`;
  //console.log(a.keyTerms);

}
main();
