'use strict';
const express = require('express');
const controller = require('./Product.controller');

const router = express.Router();

router.get('/', controller.findProduct);

router.get('/:id', controller.findProductById);

router.post('/', controller.createProduct);

router.put('/:id', controller.updateProduct);

router.delete('/:id', controller.removeProduct);

module.exports = router;
