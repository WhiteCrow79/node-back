'use strict';

const logger = require('../../config/logger');
const Board = require('../../models/Board');

const output = {
  list: async (req, res) => {
    logger.info(`GET / 304 '게시판 화면으로 이동'`);
    const board = new Board(req.body);
    const response = await board.list();
    const url = {
      method: 'GET',
      path: '/list',
      status: response.err ? 400 : 200,
    };
    log(response, url);

    res.render('board/list', { data: response });
  },

  write: (req, res) => {
    logger.info(`GET / 304 '게시판 등록 화면으로 이동'`);
    const url = {
      method: 'GET',
      path: '/write',
      status: 200,
    };

    res.render('board/write');
  },

  detail: async (req, res) => {
    const bbrdseq = req.params.bbrdseq;
    console.log('bbrdseq', bbrdseq);
    const board = new Board();
    const response = await board.detail(bbrdseq);

    const url = {
      method: 'GET',
      path: '/detail',
      status: response.err ? 400 : 200,
    };
    log(response, url);
    res.render('board/detail', { data: response });
    //return res.json(response);
  },
};

const process = {
  write: async (req, res) => {
    console.log(req.body);
    const board = new Board(req.body);
    console.log(board);
    const response = await board.write();
    const url = {
      method: 'POST',
      path: '/write',
      status: response.err ? 400 : 200,
    };
    log(response, url);
    return res.json(response);
  },

  modify: async (req, res) => {
    const board = new Board(req.body);
    const response = await board.modify();
    const url = {
      method: 'POST',
      path: '/modify',
      status: response.err ? 400 : 200,
    };
    log(response, url);
    return res.json(response);
  },

  delete: async (req, res) => {
    const bbrdseq = req.params.bbrdseq;
    const board = new Board();
    const response = await board.delete(bbrdseq);
    const url = {
      method: 'DELETE',
      path: '/delete',
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
