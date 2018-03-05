'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _User = require('./api/v0/User');

var _User2 = _interopRequireDefault(_User);

var _Board = require('./api/v0/Board');

var _Board2 = _interopRequireDefault(_Board);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || _config2.default.port;

/**
 * mongoDB 연결 
 * port 설정 
 * view directroy 설정
 * view engine을 jade로 설정
 */
_mongoose2.default.connect(_config2.default.mongoUri).then(function () {
    console.log('Connect mongo database successfully');
}).catch(function (err) {
    return console.error('fail to connect mongo database...\n ' + err);
});
app.set('port', port);
app.set('views', _path2.default.join(__dirname, 'views'));
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
app.use((0, _helmet2.default)());
app.use((0, _morgan2.default)('dev'));
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'public', 'favicon.ico')));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _expressSession2.default)({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use('/', _route2.default);
app.use('/api/v0/user', _User2.default);
app.use('/api/v0/boards', _Board2.default);
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('The application started at ' + port);
});