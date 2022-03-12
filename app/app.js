'use strict';

// 모듈
const express = require('express');
// .env
const dotenv = require('dotenv');
//const morgan = require('morgan');
//const fs = require('fs');

const app = express();
dotenv.config();

// 라우팅
const home = require('./src/routes/home');
const board = require('./src/routes/board');

// session
const session = require('express-session');
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({ extended: true }));
//morgan log
//app.use(morgan('common', { stream: accessLogStream }));

// use -> 미들 웨어를 등록하는 메서드
app.use('/', home);
app.use('/board', board);

module.exports = app;
