/**
  * Function used to test object functionality
  */
function main() {
  let x = new StudyGuide();
  x.addTerm("mitosis");
  //console.log(x.descriptions);

  let y = new ParseText();
  y.text = "hello world";
  //console.log(y.text);

  let z = new SummarizeText();
  z.text = "summarize this";
  console.log(z.summary);

  let a = new ExtractTerms();
  a.text = "extract this";
  console.log(a.keyTerms);

}
main();
