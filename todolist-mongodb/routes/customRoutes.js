const express = require('express');
const router = express.Router();
const customController = require('../controllers/customController');

router.get('/favicon.ico', (__, res) => res.status(204).end());

router.get('/:customListName', customController.getCustomList);

module.exports = router;