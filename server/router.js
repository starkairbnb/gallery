const controller = require('./controller');
const express = require('express');
const router = express.Router();

router
  .route('/photos/:id')
  .get(controller.get)
  .delete(controller.delete)
  .put(controller.update)

router
  .route('/photos/')
  .get(controller.getAll)
  .post(controller.createOne)

module.exports = router;