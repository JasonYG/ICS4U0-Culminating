const rp = require('request-promise');
const cheerio = require('cheerio');
const json = require('jsonfile');

let Topic = require('./Topic')

async function main() {
  let topic = new Topic("Cryogenics", 20);
  await topic.getInformation().catch(err => console.error(err));
  await topic.writeToFile('data.json').catch(err => console.error(err));
}

main();

function createData() {
  let datas = [];
  for (i = 0; i < 100000 ; i++) {
   datas.push({
     "topic" : makeString(Math.floor(Math.random() * 10)),
     "value" : Math.random() * 5000
   });
  }
  console.log(datas);
  json.writeFile('data.json', datas);
}


function makeString(length) {
   let result = '';
   let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}
