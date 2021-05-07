'use strict';

const db = require('../config/db');

class UserStorage {
  
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = 'select * from users where id = ?;';
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = 'insert into user(id, name, psword) values(?, ?, ?);';
      db.query(
        query,
        [userInfo.id, userInfo.name, userInfo.psword],
        (err, data) => {
          if (err) reject(`${err}`);
          resolve({ success: true });
        }
      );
    });
  }
}

module.exports = UserStorage;
