const fs = require('fs');

const generatePropId = (maxPropId) => {
  let maximum = Math.floor(maxPropId);
  return Math.floor(Math.random() * (maximum - 1 + 1)) + 1;
}

const keywords = ['house', 'building', 'neighborhood', 'nature'];

const generateUrl = () => {
  let keyword = keywords[Math.floor(Math.random() * (3 + 1))];
  return `https://loremflickr.com/320/240/${keyword}?random=1`;
}

const createRecord = () => {
  return {
    prop_id: generatePropId(50),
    url: generateUrl()
  }
}

const dataWriteStream = fs.createWriteStream(__dirname + '/csvSeedData/tenonly.csv');

function writeNTimes(numberOfTimes, writer, createRecordFunc, callback) {
  let i = numberOfTimes + 1;
  write();
  function write() {
    let ok = true;
    do {
      let temp = Object.values(createRecordFunc());
      let newRecord = JSON.stringify(temp); 
      newRecord = newRecord.substring(1, newRecord.length - 1) + '\n';
      if (i === numberOfTimes + 1) {
        writer.write('prop_id, url \n');
        i--;
      } else if (i === 1) {
        writer.write(newRecord, callback);
        i--;
      } else {
        ok = writer.write(newRecord);
        i--;
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}


writeNTimes(10, dataWriteStream, createRecord, () => {
  console.log(`write stream complete.`);
});
