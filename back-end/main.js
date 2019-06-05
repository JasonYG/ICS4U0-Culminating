const express = require("express");
const app = express();
const port = 5000;

app.get("/api/test", (req, res) => res.send({ Hello: "world" }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let ParseText = require("./ParseText");
let SummarizeText = require("./SummarizeText");
let ExtractTerms = require("./ExtractTerms");

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