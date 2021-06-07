'use strict';

const db = require('../config/db');

class UserStorage {
  static getUserInfo(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM USER WHERE USER_ID = ?;`;
      db.query(query, [userId], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO USER ( 
        USER_ID, USER_NAME, USER_PASS, USER_TEL, DEL_YN, 
        REG_DATE, REG_USER_ID, CHG_DATE, CHG_USER_ID 
        ) 
        VALUES (
        ?, ?, ?, ?, 'N', NOW(), ?, NOW(), ? 
        );`;
      db.query(
        query,
        [
          userInfo.USER_ID,
          userInfo.USER_NAME,
          userInfo.USER_PASS,
          userInfo.USER_TEL,
          userInfo.USER_ID,
          userInfo.USER_ID,
        ],
        (err, data) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = UserStorage;
