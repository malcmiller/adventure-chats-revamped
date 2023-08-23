const express = require('express');
const categoryCtrl = require('../../controllers/api/categories');

const router = express.Router();

router.get('/api/categories', categoryCtrl.index);
router.get('/api/categories/:id', categoryCtrl.show);
router.get('/api/categories', categoryCtrl.fetchCategories);
module.exports = router;