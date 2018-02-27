'use strict';
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
/**
 * mongoDB 연결
 */
mongoose
    .connect(config.mongoUri)
    .then(() => { console.log(`Connect mongo database successfully`) })
    .catch((err) => console.error(`fail to connect mongo database...\n ${err}`))

/**
 * x-powered-by 해더를 제거하여 서버 정보 유출방지
 */
app.disable('x-powered-by');
/**
 * helmet을 사용하여 http해더 보안설정
 * 
 * body parser을 이용하여 reqeuest body를 json으로 파싱하기
 */
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('hello hell world!!!');
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`The application started at ${port}`);
});
