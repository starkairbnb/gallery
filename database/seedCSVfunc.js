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

const createRecord = (maxPropId) => {
  return {
    prop_id: generatePropId(maxPropId),
    url: generateUrl()
  }
}

const dataWriteStream = fs.createWriteStream(__dirname + '/csvSeedData/seedData.csv');

function writeNTimes(numberOfTimes, writer, createRecord, callback) {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      let temp = Object.values(createRecord(1e7));
      temp.unshift(i);
      let newRecord = JSON.stringify(temp); 
      newRecord = newRecord.substring(1, newRecord.length - 1) + '\n';
      if (i === 0) {
        writer.write('id, prop_id, url \n');
        i++;
      } else if (i === numberOfTimes) {
        writer.write(newRecord, callback);
        i++;
      } else {
        ok = writer.write(newRecord);
        i++;
      }
    } while (i <= numberOfTimes && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}


writeNTimes(5e7, dataWriteStream, createRecord, () => {
  console.log(`write stream complete.`);
});