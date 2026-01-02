const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const date = require('../utils/date');

router.get('/', itemController.getItems);

router.post('/', itemController.createItem);

router.post('/delete', itemController.deleteItem);

module.exports = router;