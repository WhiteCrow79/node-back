'use strict';

class UserStorage {
  static #users = {
    //바로접근 하지만 private(은닉화)
    id: ['whitecrow', 'yuna', 'hajun'],
    psword: ['1234', '1234', '1234'],
    name: ['가', '나', '다'],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  };

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); // => [id, psword, name]
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  };

}

module.exports = UserStorage;
