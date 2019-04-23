const fs = require('fs');

const keywords = ['house', 'building', 'neighborhood', 'nature'];
const locations = ['Los Angeles', 'Glendale', 'Marina del Rey', 'Hollywood', 'Hawthorne', 'Pasadena', 'Inglewood', 'Compton', 'Koreatown', 'Westchester', "Bel-Air", "Beverly Hills", "West LA", 'Santa Monica', 'Venice', 'Malibu'];
const adjectives = ['', "Beautiful", 'Cozy', 'Convenient', 'Magical', 'Private', 'Vintage', 'Charming', 'Themed', 'Modern', 'Luxurious', 'Getaway', 'Quaint', 'Hilltop', 'Scenic', 'Picturesque', 'Comfy'];
const nouns = ['Home', 'Flat', 'Apartment', 'Suite', 'Loft', 'Cottage', 'Townhouse', 'Condo', 'Bungalow', 'Retreat', 'House', 'Castle', 'Mansion'];

const generateTitle = () => {
  return adjectives[Math.floor(Math.random() * ((adjectives.length - 1) - 0 + 1)) + 0] + ' ' + nouns[Math.floor(Math.random() * ((nouns.length - 1) - 0 + 1)) + 0];
}

const generateLocation = () => {
  return locations[Math.floor(Math.random() * ((locations.length - 1) - 0 + 1)) + 0];
}

const generateUrls = (min, max) => {
  let urls = [];
  let minimum = Math.ceil(min);
  let maximum = Math.floor(max);
  let numberOfPictures = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  for (let i = 1; i <= numberOfPictures; i++) {
    let keyword = keywords[Math.floor(Math.random() * (3 - 0 + 1)) + 0];
    urls.push(`https://loremflickr.com/320/240/${keyword}?random=${i}`)
  }
  return urls;
}

const createRecord = () => {
  return {
    title: generateTitle(),
    location: generateLocation(),
    urls: generateUrls(5, 8)
  }
}

const dataWriteStream = fs.createWriteStream(__dirname + '/seedData.json');

function writeNTimes(numberOfTimes, writer, createRecordFunc, callback) {
  let i = numberOfTimes; // 10M
  write();
  function write() {
    let ok = true;
    do {
      // creates array of object values
      let temp = createRecordFunc();
      // inserts id value at beginning
      temp.id = i;
      // stringifies array
      let newRecord = JSON.stringify(temp); 
      // removes brackets and beginning and end of string
      // newRecord = newRecord.substring(1, newRecord.length - 1) + '\n';
      /*if (i === numberOfTimes) {
        newRecord = "[" + newRecord + ",";
        writer.write(newRecord);
        i--;
      } else */
      if (i === 1) {
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


writeNTimes(1e7, dataWriteStream, createRecord, () => {
  // let start = Date.now();
  console.log(`write stream complete.`);
  // db.insertMany(initData).then(() => {
  //   console.log(`database seeded. milliseconds: ${Date.now() - start}`)
  //   mongoose.connection.close();
  // }) 
});
