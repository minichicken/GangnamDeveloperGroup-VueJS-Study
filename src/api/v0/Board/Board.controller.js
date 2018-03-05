import Board from './Board.model'

export function createBoard(req, res, next) {
    Board.create(req.body, (err, board) => {
        if (err) {
            return next(err)
        }
        res.json(board)
    })
}

export function findBoard(req, res, next) {
    Board.find((err, boards) => {
        if (err) {
            return next(err)
        }
        res.json(boards)
    })
}

export function findBoardById(req, res, next) {
    Board.findById(req.params.id, (err, board) => {
        if (err) {
            return next(err)
        }
        res.json(board)
    })
}

export function updateBoard(req, res, next) {
    Board.findByIdAndUpdate(req.params.id, req.body, (err, board) => {
        if (err) {
            return next(err)
        }
        res.json(board)
    })
}

export function removeBoard(req, res, next) {
    Board.findByIdAndRemove(req.params.id, (err, board) => {
        if (err) {
            return next(err)
        }
        res.json(board)
    })
}
