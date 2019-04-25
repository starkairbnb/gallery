const db = require('../database/postgresModel');

const controller = {
  get: (req, res) => {
    db
      .findAll({ where: { id: req.params.id } })
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  getAll: (req, res) => {
    db
      .findAll({})
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
    .destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  },
  update: (req, res) => {
    db
    .update(req.body, { where: { id: req.params.id } })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  }
}

module.exports = controller;