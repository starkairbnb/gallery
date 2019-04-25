const db = require('../database/index.js');

const controller = {
  get: (req, res) => {
    let { id } = req.params;
    console.log('recieved request for id: ', id)
    db
      .find({ id })
      .then(data => {
        console.log(data)
        res.status(200).send(data)
      })
      .catch(err => res.status(404).send(err))
  },
  getAll: (req, res) => {
    db
      .find({})
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  createOne: (req, res) => {
    console.log(req.body)
    let { id, prop_id, url } = req.body;
    db
    .create({ id, prop_id, url })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  },
  delete: (req, res) => {
    let { id } = req.params;
    db
    .deleteOne({ id })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  },
  update: (req, res) => {
    let { id } = req.params;
    db
    .updateOne({ id }, req.body)
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  }
}

module.exports = controller;