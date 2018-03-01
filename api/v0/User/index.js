'use strict';
const express = require('express');
const controller = require('./User.controller');
const router = express.Router();

router.get('/', controller.findUser);

router.get('/:id', controller.findUserById);

router.post('/', controller.createUser);

router.put('/:id', controller.updateUser);

router.delete('/:id', controller.removeUser);

module.exports = router;
