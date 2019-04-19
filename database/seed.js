const db = require('./index.js');
const mongoose = require('mongoose');

// const initData = require('./seed.json')
// console.log(initData)

mongoose.Promise = global.Promise

// db.create(initData).then(() => mongoose.connection.close())

const keywords = ['house', 'building', 'neighborhood', 'nature'];
const locations = ['Los Angeles', 'Glendale', 'Marina del Rey', 'Hollywood', 'Hawthorne', 'Pasadena', 'Inglewood', 'Compton', 'Koreatown', 'Westchester', "Bel-Air", "Beverly Hills", "West LA", 'Santa Monica', 'Venice', 'Malibu'];
const adjectives = ['', "Beautiful", 'Cozy', 'Convenient', 'Magical', 'Private', 'Vintage', 'Charming', 'Themed', 'Modern', 'Luxurious', 'Getaway', 'Quaint', 'Hilltop', 'Scenic', 'Picturesque', 'Comfy'];
const nouns = ['Home', 'Flat', 'Apartment', 'Suite', 'Loft', 'Cottage', 'Townhouse', 'Condo', 'Bungalow', 'Retreat', 'House', 'Castle', 'Mansion'];

const generateTitle = () => {
  let min = Math.ceil(min);
  let max = Math.floor(max);
  return adjectives[Math.floor(Math.random() * ((adjectives.length - 1) - 0 + 1)) + 0] + ' ' + nouns[Math.floor(Math.random() * ((nouns.length - 1) - 0 + 1)) + 0];
}

const generateLocation = () => {
  let min = Math.ceil(min);
  let max = Math.floor(max);
  return locations[Math.floor(Math.random() * ((locations.length - 1) - 0 + 1)) + 0];
}

const generateUrls = (min, max) => {
  let urls = [];
  let min = Math.ceil(min);
  let max = Math.floor(max);
  let numberOfPictures = Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 1; i <= numberOfPictures; i++) {
    let keyword = keywords[Math.floor(Math.random() * (3 - 0 + 1)) + 0];
    urls.push(`https://loremflickr.com/320/240/${keyword}?random=${i}`)
  }
  return urls;
}

const initData = (numberOfRecords) => {
  const data = [];
  for (let i = 0; i <= numberOfRecords; i++) {
    let listing = {};
    listing.id = i;
    listing.title = generateTitle();
    listing.location = generateLocation();
    listing.urls = generateUrls(5, 8);
    data.push(listing);
  };
  return JSON.stringify(data);
}


// house
// building
// neighborhood