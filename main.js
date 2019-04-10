let ParseText = require("./ParseText");
let SummarizeText = require("./SummarizeText");
let ExtractTerms = require("./ExtractTerms");
/**
  * Function used to test object functionality
  */
async function main() {
  let parser = new ParseText();
  let summarizer = new SummarizeText();
  let extractor = new ExtractTerms();

  //Demonstration of polymorphism
  //let textAPIs = [summarizer, parser, extractor];

  //await summarizer.callApi();
  //extractor.text = summarizer.summary;
  extractor.text = `Allopatric speciation is typically subdivided into two major models: vicariance and peripatric. Both models differ from one another by virtue of their population sizes and geographic isolating mechanisms. The terms allopatry and vicariance are often used in biogeography to describe the relationship between organisms whose ranges do not significantly overlap but are immediately adjacent to each other—they do not occur together or only occur within in a narrow zone of contact. Historically, the language used to refer to modes of speciation directly reflected biogeographical distributions.[2] As such, allopatry is a geographical distribution opposed to sympatry (speciation within the same area). Furthermore, the terms allopatric, vicariant, and geographical speciation are often used interchangeably in the scientific literature.[2] This article will follow a similar theme, with the exception of special cases such as peripatric, centrifugal, among others.`;
  await extractor.callApi();

  extractor.sortTerms();
  console.log(extractor.keyTerms);
  
}
main();
