'use strict';
const express = require('express');
const controller = require('./Board.controller');

const router = express.Router();

router.get('/', controller.findBoard);

router.get('/:id', controller.findBoardById);

router.post('/', controller.createBoard);

router.put('/:id', controller.updateBoard);

router.delete('/:id', controller.removeBoard);

module.exports = router;
