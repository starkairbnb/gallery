const controller = require('./controller');
const express = require('express');
const router = express.Router();

router
  .route('/photos/:id')
  .get(controller.getByPhotoId)
  .delete(controller.deleteByPhotoId)
  .put(controller.updateByPhotoId)

router
  .route('/photos/')
  .get(controller.getAllPhotos)
  .post(controller.addNewPhoto)
  
router
  .route('/property/:prop_id/photos')
  .get(controller.getPhotosByPropId)
  .delete(controller.deleteAllPhotosAtPropId)

module.exports = router;