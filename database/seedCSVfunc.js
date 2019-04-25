const fs = require('fs');

let numberOfRecords = 5e7;
let writeFile = '/csvSeedData/seedData.csv';
// let writeFile = '/csvSeedData/tenonly.csv';

const generatePropId = (minPropId, maxPropId) => {
  min = Math.ceil(minPropId);
  max = Math.floor(maxPropId);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const keywords = ['house', 'building', 'neighborhood', 'nature'];

const generateUrl = () => {
  let keyword = keywords[Math.floor(Math.random() * (3 + 1))];
  return `https://loremflickr.com/320/240/${keyword}?random=1`;
}

const createRecord = (minPropId, maxPropId) => {
  return {
    prop_id: generatePropId(minPropId, maxPropId),
    url: generateUrl()
  }
}

const dataWriteStream = fs.createWriteStream(__dirname + writeFile);

function writeNTimes(numberOfTimes, writer, createRecord, callback) {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      // if we are on the first i, write header in CSV
      if (i === 0) {
        writer.write('prop_id, url \n');
        i++;
      // if i is less than than 5 million, assign a prop_id between 1 and 1 million
      } else if (i <= 5e6) {
          let temp = Object.values(createRecord(1, 1e6));
          let newRecord = JSON.stringify(temp); 
          newRecord = newRecord.substring(1, newRecord.length - 1) + '\n';
          ok = writer.write(newRecord);
          i++;
      // if i is between 5 million and 45 million, assign a prop_id between 1,000,001 and 8,999,999
      } else if (i > 5e6 && i < 45e6) {
        let temp = Object.values(createRecord(1000001, 8999999));
        let newRecord = JSON.stringify(temp); 
        newRecord = newRecord.substring(1, newRecord.length - 1) + '\n';
        ok = writer.write(newRecord);
        i++;
      // if i is greater than 45 million, assign a prop_id between 9 million and 10 million
      } else if (i >= 45e6 && i < numberOfTimes) {
        let temp = Object.values(createRecord(9e6, 1e7));
        let newRecord = JSON.stringify(temp); 
        newRecord = newRecord.substring(1, newRecord.length - 1) + '\n';
        ok = writer.write(newRecord);
        i++;
      // if we are on the last record, perform callback
      } else if (i === numberOfTimes) {
        let temp = Object.values(createRecord(9e6, 1e7));
        let newRecord = JSON.stringify(temp); 
        newRecord = newRecord.substring(1, newRecord.length - 1) + '\n';
        writer.write(newRecord, callback);
        i++;
      }
    } while (i <= numberOfTimes && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

writeNTimes(numberOfRecords, dataWriteStream, createRecord, () => {
  console.log(`write stream complete.`);
});

// module.exports = numberOfRecords;