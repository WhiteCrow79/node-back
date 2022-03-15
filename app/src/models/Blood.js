'use strict';

const BloodStorage = require('./BloodStorage');

class Blood {
  constructor(body) {
    this.body = body;
  }

  //등록
  async write() {
    const client = this.body;
    try {
      const response = await BloodStorage.write(client);
      return response;
    } catch (err) {
      return {
        success: false,
        err,
      };
    }
  }
}

module.exports = Blood;
