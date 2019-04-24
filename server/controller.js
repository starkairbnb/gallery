const db = require('../database/mongooseIndex')

const controller = {
  get: (req, res) => {
    db
      .find({
        id: req.params.id
      })
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  getAll: (req, res) => {
    db
      .find({})
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  createOne: (req, res) => {
    let { id, urls, title, location } = req.body;
    db
    .create({ id, urls, title, location })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  },
  delete: (req, res) => {
    db
    .deleteOne({ id: req.params.id })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  },
  update: (req, res) => {
    db
    .updateOne({ id: req.params.id }, req.body)
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  }
}

module.exports = controller;