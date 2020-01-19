let ParseText = require("./ParseText");
let SummarizeText = require("./SummarizeText");

const fs = require("fs");
/**
 * Function used to test object functionality
 */
async function main() {
  let parser = new ParseText();
  let summarizer = new SummarizeText();

  summarizer.text = `Animals have several characteristics that set them apart from other living things. Animals are eukaryotic and multicellular, unlike bacteria, which are prokaryotic, and unlike protists, which are eukaryotic but unicellular. Unlike plants and algae, which produce their own nutrients animals are heterotrophic, feeding on organic material and digesting it internally. With very few exceptions, animals respire aerobically. All animals are motile (able to spontaneously move their bodies) during at least part of their life cycle, but some animals, such as sponges, corals, mussels, and barnacles, later become sessile. The blastula is a stage in embryonic development that is unique to most animals, allowing cells to be differentiated into specialised tissues and organs.`;

  //Demonstration of polymorphism
  //let textAPIs = [summarizer, parser, extractor];

  await summarizer.callApi();
  console.log(summarizer.summary);
}
main();
