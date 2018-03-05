import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/join', (req, res, next) => {
    res.render('join')
})

router.get('/logout', (req, res, next) => {
    res.redirect('/')
})

export default router