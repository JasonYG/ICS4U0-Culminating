const rp = require('request-promise');
const cheerio = require('cheerio');
const json = require('jsonfile');

let Topic = require('./Topic')

async function main() {
  const topic = new Topic("Animal", 3, 2);
  const data = await topic.getInformation().catch(err => console.error(err));

  for (let property in data) {
    if (data.hasOwnProperty(property)) {
      console.log(property);
    }
  }

  // console.log(data);

  // console.log("\n\n\n---\n\n\n");
  //
  //
  // for (var term in data) {
  //   if (data.hasOwnProperty(term)) {
  //     console.log(term + ": " + data[term]);
  //   }
  // }
  json.writeFile('data.json', data);
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
