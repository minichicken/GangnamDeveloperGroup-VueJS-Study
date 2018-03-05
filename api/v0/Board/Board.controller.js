'use strict';
const Board = require('./Board.model');

module.exports = {
    createBoard: (req, res, next) => {
        Board.create(req.body, (err, board) => {
            if (err) { return next(err); }
            res.json(board);
        });
    },
    findBoard: (req, res, next) => {
        Board.find((err, boards) => {
            if (err) { return next(err); }
            res.json(boards);
        });
    },
    findBoardById: (req, res, next) => {
        Board.findById(req.params.id, (err, board) => {
            if (err) { return next(err); }
            res.json(board);
        });
    },
    updateBoard: (req, res, next) => {
        Board.findByIdAndUpdate(req.params.id, req.body, (err, board) => {
            if (err) { return next(err) }
            res.json(board);
        });
    },
    removeBoard: (req, res, next) => {
        Board.findByIdAndRemove(req.params.id, (err, board) => {
            if (err) { return next(err); }
            res.json(board);
        });
    }
}
