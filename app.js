'use strict';
const express = require('express');
const session = require('express-session');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('./config');
const User = require('./api/v0/User');
const Auth = require('./api/v0/Auth');
const Product = require('./api/v0/Product');
const Route = require('./route');

const app = express();
const port = process.env.PORT || config.port;

/**
 * mongoDB 연결
 */
mongoose
    .connect(config.mongoUri)
    .then(() => { console.log(`Connect mongo database successfully`) })
    .catch((err) => console.error(`fail to connect mongo database...\n ${err}`))

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/**
 * x-powered-by 해더를 제거하여 서버 정보 유출방지
 */
app.disable('x-powered-by');
/**
 * helmet을 사용하여 http해더 보안설정
 * morgan을 사용하여 http request 로깅하기
 * serve-favicon을 사용하여 favicon 제공하기
 * 
 * body parser을 이용하여 reqeuest body를 json으로 파싱하기
 * /api/v0/user에 라우팅하기
 * 라우팅에 실패하면 404 던지기
 * 에러 나면 개발 모드에는 에러 메시지 던지고 프로덕션에서는 에러상테만 던지기
 */
app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', Route);
app.use('/api/v0/user', User);
app.use('/api/v0/product', Product);
//app.use('/api/v0/auth', Auth);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`The application started at ${port}`);
});
