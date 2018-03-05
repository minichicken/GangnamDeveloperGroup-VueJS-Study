'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBoard = createBoard;
exports.findBoard = findBoard;
exports.findBoardById = findBoardById;
exports.updateBoard = updateBoard;
exports.removeBoard = removeBoard;

var _Board = require('./Board.model');

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBoard(req, res, next) {
    _Board2.default.create(req.body, function (err, board) {
        if (err) {
            return next(err);
        }
        res.json(board);
    });
}

function findBoard(req, res, next) {
    _Board2.default.find(function (err, boards) {
        if (err) {
            return next(err);
        }
        res.json(boards);
    });
}

function findBoardById(req, res, next) {
    _Board2.default.findById(req.params.id, function (err, board) {
        if (err) {
            return next(err);
        }
        res.json(board);
    });
}

function updateBoard(req, res, next) {
    _Board2.default.findByIdAndUpdate(req.params.id, req.body, function (err, board) {
        if (err) {
            return next(err);
        }
        res.json(board);
    });
}

function removeBoard(req, res, next) {
    _Board2.default.findByIdAndRemove(req.params.id, function (err, board) {
        if (err) {
            return next(err);
        }
        res.json(board);
    });
}