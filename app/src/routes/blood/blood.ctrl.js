'user strict';

const logger = require('../../config/logger');
const Blood = require('../../models/Blood');

const output = {
  //등록 페이지
  write: async (req, res) => {
    logger.info(`GET / 304 '혈압 등록 화면으로 이동'`);

    //마지막 등록한 혈압정보를 가지고 온다.
    req.body.USER_INFO = req.session.userInfo;

    const blood = new Blood(req.body);
    const response = await blood.lastInfo();

    const url = {
      method: 'GET',
      path: '/write',
      status: response.err ? 400 : 200,
    };
    log(response, url);

    console.log(response);

    res.render('blood/write', { data: response });
  },
};

const process = {
  //등록
  write: async (req, res) => {
    console.log(req.body);
    console.log(req.session.userInfo);

    //session정보 추가
    req.body.USER_INFO = req.session.userInfo;

    const blood = new Blood(req.body);
    const response = await blood.write();

    const url = {
      method: 'POST',
      path: '/write',
      status: response.err ? 400 : 200,
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
