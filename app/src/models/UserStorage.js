'use strict';

const fs = require('fs').promises; //promise설정

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); // => [id, psword, name]
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;

    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUsers(isAll, ...fields) {
    // const users = this.#users;
    return fs
      .readFile('./src/databases/users.json')
      .then((data) => {
        console.log(data.length);

        return data.length > 0 ? this.#getUsers(data, isAll, fields) : {};
      })
      .catch(console.error);
  }

  static getUserInfo(id) {
    // const users = this.#users;
    return fs
      .readFile('./src/databases/users.json')
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);

    if (users.hasOwnProperty('id') && users.id.includes(userInfo.id)) {
      throw '이미 존재하는 아이디 입니다.';
    }
    if (!users.id) users.id = [];
    users.id.push(userInfo.id);

    if (!users.name) users.name = [];
    users.name.push(userInfo.name);

    if (!users.psword) users.psword = [];
    users.psword.push(userInfo.psword);

    fs.writeFile('./src/databases/users.json', JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
