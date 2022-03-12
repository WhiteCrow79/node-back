'use strict';

const logger = require('../../config/logger');
const User = require('../../models/User');

const output = {
  home: (req, res) => {
    logger.info(`GET / 304 '홈 화면으로 이동'`);

    console.log(req.session.userInfo);

    // if (req.session.userInfo) {
    //   res.render('home/main', { userInfo: req.session.userInfo });
    // } else {
    //   res.render('home/login');
    // }
    res.render('home/main', { userInfo: req.session.userInfo });
  },

  login: (req, res) => {
    logger.info(`GET / 304 '로그인 화면으로 이동'`);
    res.render('home/login');
  },

  register: (req, res) => {
    logger.info(`GET / 304 '회원가입 화면으로 이동'`);
    res.render('home/register');
  },

  logout: (req, res) => {
    logger.info(`GET / 304 '로그아웃 로그인 화면으로 이동'`);
    // 세션삭제
    req.session.destory();
    res.redirect('/');
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    if (response.success) {
      req.session.userInfo = {
        userId: response.userId,
        userName: response.userName,
      };
    }

    const url = {
      method: 'POST',
      path: '/login',
      status: response.err ? 400 : 200,
    };
    log(response, url);
    return res.json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    const url = {
      method: 'POST',
      path: '/register',
      status: response.err ? 409 : 201,
    };
    log(response, url);
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};

const log = (response, url) => {
  if (response.err) {
    logger.error(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
    );
  } else {
    logger.info(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${
        response.msg || ''
      }`
    );
    console.log(response);
  }
};
