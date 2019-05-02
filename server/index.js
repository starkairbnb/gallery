require('newrelic');
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const router = require('./router.js');
const port = 3001;
const server = express();


server.use(morgan('dev'));
server.use(parser.json());
server.use(parser.urlencoded({
  extended: true
}));

server.use('/api', router)
server.use(express.static(path.join(__dirname, '/../client/dist')))

server.listen(port, () => console.log(`connected at ${port}`));