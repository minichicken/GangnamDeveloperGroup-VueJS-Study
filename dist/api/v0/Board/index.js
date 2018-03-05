'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Board = require('./Board.controller');

var controller = _interopRequireWildcard(_Board);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', controller.findBoard);

router.get('/:id', controller.findBoardById);

router.post('/', controller.createBoard);

router.put('/:id', controller.updateBoard);

router.delete('/:id', controller.removeBoard);

exports.default = router;