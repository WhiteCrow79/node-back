'use strict';

const logger = require('../../config/logger');
const Board = require('../../models/Board');

const output = {
  list: (req, res) => {
    logger.info(`GET / 304 '게시판 화면으로 이동'`);
    res.render('board/list');
  },
};

module.exports = {
  output,
};
