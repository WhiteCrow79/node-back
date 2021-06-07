'use strict';

const BoardStorage = require('./BoardStorage');

class Board {
  constructor(body) {
    this.body = body;
  }

  async list() {
    const client = this.body;

    try {
      const response = await BoardStorage.getBoardList();
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async write() {
    const client = this.body;

    try {
      const response = await BoardStorage.write(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async detail(bbrdseq) {
    try {
      const response = await BoardStorage.detail(bbrdseq);
      console.log(response);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async modify() {
    const client = this.body;

    try {
      const response = await BoardStorage.modify(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = Board;
