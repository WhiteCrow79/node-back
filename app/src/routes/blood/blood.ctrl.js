'user strict';

const logger = require('../../config/logger');
// const Blood = require('../../models/Blood');

const output = {

    //등록
    write: (req, res) => {
        logger.info(`GET / 304 '혈압 등록 화면으로 이동'`);
        
        res.render('blood/write');
    }
};

module.exports = {
    output,
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