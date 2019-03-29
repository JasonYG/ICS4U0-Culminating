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
  // textAPIs.forEach(api => {
  //   api.text = "This API is working correctly";
  //   if (typeof api.callApi === 'function') api.callApi();
  // });
  textAPIs[2].text = `When the war began, the German Order of Battle placed 80% of the army in the West, with the remainder acting as a screening force in the East. The plan was to quickly knock France out of the war, then redeploy to the East and do the same to Russia.

The German offensive in the West was officially titled Aufmarsch II West, but is better known as the Schlieffen Plan, after its original creator. Schlieffen deliberately kept the German left (i.e. its positions in Alsace-Lorraine) weak to lure the French into attacking there, while the majority were allocated to the German right, so as to sweep through Belgium, encircle Paris and trap the French armies against the Swiss border (the French charged into Alsace-Lorraine on the outbreak of war as envisaged by their Plan XVII, thus actually aiding this strategy).[74] However, Schlieffen's successor Moltke grew concerned that the French might push too hard on his left flank. As such, as the German Army increased in size in the years leading up to the war, he changed the allocation of forces between the German right and left wings from 85:15 to 70:30. Ultimately, Moltke's changes meant insufficient forces to achieve decisive success and thus unrealistic goals and timings.[75][dubious – discuss]

The initial German advance in the West was very successful: by the end of August the Allied left, which included the British Expeditionary Force (BEF), was in full retreat; French casualties in the first month exceeded 260,000, including 27,000 killed on 22 August during the Battle of the Frontiers.[76] German planning provided broad strategic instructions, while allowing army commanders considerable freedom in carrying them out at the front; this worked well in 1866 and 1870 but in 1914, von Kluck used this freedom to disobey orders, opening a gap between the German armies as they closed on Paris.[77] The French and British exploited this gap to halt the German advance east of Paris at the First Battle of the Marne from 5 to 12 September and push the German forces back some 50 km (31 mi).

In 1911, the Russian Stavka had agreed with the French to attack Germany within 15 days of mobilisation; this was unrealistic and the two Russian armies that entered East Prussia on 17 August did so without many of their support elements.[78] The Russian Second Army was effectively destroyed at the Battle of Tannenberg on 26–30 August but the Russian advance caused the Germans to re-route their 8th Field Army from France to East Prussia, a factor in Allied victory on the Marne.[citation needed]

By the end of 1914, German troops held strong defensive positions inside France, controlled the bulk of France's domestic coalfields and had inflicted 230,000 more casualties than it lost itself. However, communications problems and questionable command decisions cost Germany the chance of a decisive outcome while it had failed to achieve the primary objective of avoiding a long, two-front war.[79] This amounted to a strategic defeat; shortly after the Marne, Crown Prince Wilhelm told an American reporter; "We have lost the war. It will go on for a long time but lost it is already."[`
  textAPIs[2].callApi();
}
main();
