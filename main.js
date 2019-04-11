let ParseText = require("./ParseText");
let SummarizeText = require("./SummarizeText");
let ExtractTerms = require("./ExtractTerms");

const fs = require('fs');
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

  console.time('Total time: ');
  console.time('Read file: ');
  extractor.terms = fs.readFileSync('manyTerms.txt', 'utf8').replace(/\r/g, "").split('\n');
  console.timeEnd('Read file: ');
  //await extractor.callApi();

  console.time('Sorting: ');
  extractor.sortTerms();
  console.timeEnd('Sorting: ');
  //console.log(extractor.keyTerms);
  console.timeEnd('Total time: ');

  console.time('Write to file: ');
  const stream = fs.createWriteStream('sortedTerms.txt');
  stream.once('open', () => {
    extractor.terms.map((currentTerm) => stream.write(term + "\n"));
  });
  console.timeEnd('Write to file: ');


}
main();
