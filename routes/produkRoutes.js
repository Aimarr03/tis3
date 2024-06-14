const express = require('express');
const { createProduk } = require('../controllers/produkController');

const router = express.Router();

router.post('/', createProduk);

module.exports = router;
