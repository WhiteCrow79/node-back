'use strict';

const UserStorage = require('./UserStorage');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;

    try {
      const user = await UserStorage.getUserInfo(client.USER_ID);

      if (user) {
        const validPswd = await bcrypt.compare(
          client.USER_PASS,
          user.USER_PASS
        );
        if (user.USER_ID === client.USER_ID && validPswd) {
          return { success: true };
        }
        return { success: false, msg: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, msg: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, err };
    }
  }

  async register() {
    const client = this.body;

    //pasword 암호화
    const encPswd = await bcrypt.hash(this.body.USER_PASS, saltRounds);
    client.USER_PASS = encPswd;

    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User;
