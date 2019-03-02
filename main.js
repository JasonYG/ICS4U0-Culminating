/**
  * Function used to test object functionality
  */
function main() {
  let x = new StudyGuide();
  x.addTerm("mitosis");
  x.addDescription("mitosis", "Asexual division of cells");

  console.log(x.terms);
}
main();
