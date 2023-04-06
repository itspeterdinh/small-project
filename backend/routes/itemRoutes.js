const express = require('express');
const itemController = require('./../controllers/itemController');

const router = express.Router();

router.route('/').get(itemController.getAll).post(itemController.createItem);

router
  .route('/:id')
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

// router
//   .route('/:id/upload-photo')
//   .patch(
//     itemController.uploadItemPhoto,
//     itemController.resizeItemPhoto,
//     itemController.updateItem
//   );

module.exports = router;
