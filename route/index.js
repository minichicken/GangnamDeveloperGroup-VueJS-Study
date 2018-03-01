'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/join', (req, res, next) => {
    res.render('join');
});

router.get('/logout', (req, res, next)=>{
    res.redirect('/');
})

module.exports = router;
