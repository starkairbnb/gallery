const db = require('../database/postgresModel');

const controller = {
  getByPhotoId: (req, res) => {
    let { id } = req.params;
    db
      .findAll({ where: { id } })
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  deleteByPhotoId: (req, res) => {
    let { id } = req.params;
    db
    .destroy({ where: { id } })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  },
  updateByPhotoId: (req, res) => {
    let { id } = req.params;
    db
    .update(req.body, { where: { id } })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  },
  getAllPhotos: (req, res) => {
    db
      .findAll({})
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  addNewPhoto: (req, res) => {
    db
    .create(req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => res.status(404).send(err))
  },

  getPhotosByPropId: (req, res) => {
    let { prop_id } = req.params;
    db
      .findAll({ where: { prop_id } })
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  deleteAllPhotosAtPropId: (req, res) => {
    let { prop_id } = req.params;
    db
    .destroy({ where: { prop_id } })
    .then(data => res.status(200).send('success'))
    .catch(err => res.status(404).send(err))
  }
}

module.exports = controller;