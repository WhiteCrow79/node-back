'use strict';

const db = require('../config/db');

class BoardStorage {
  static getBoardList() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM BBRD;`;
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data);
      });
    });
  }

  static async detail(bbrdseq) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM BBRD WHERE BBRD_SEQ = ?;`;
      db.query(query, bbrdseq, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data);
      });
    });
  }

  static async write(boardInfo) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO BBRD (
        TITLE, CONTENTS, BBRD_TYPE, BBRD_NT_YN,
        REG_DATE, REG_USER_ID, CHG_DATE, CHG_USER_ID
      )
      VALUES (
        ?, ?, ?, ?, NOW(), ?, NOW(), ?
      );`;
      db.query(
        query,
        [
          boardInfo.TITLE,
          boardInfo.CONTENTS,
          boardInfo.BBRD_TYPE,
          boardInfo.BBRD_NT_YN,
          'sessionId',
          'sessionId',
        ],
        (err, data) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  static async modify(boardInfo) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE BBRD SET
        TITLE = ?,
        CONTENTS = ?,
        BBRD_TYPE = ?,
        BBRD_NT_YN = ?,
        CHG_DATE = NOW(),
        CHG_USER_ID = ?
        WHERE BBRD_SEQ = ?;`;
      db.query(
        query,
        [
          boardInfo.TITLE,
          boardInfo.CONTENTS,
          boardInfo.BBRD_TYPE,
          boardInfo.BBRD_NT_YN,
          boardInfo.BBRD_SEQ,
          'sessionId',
        ],
        (err, data) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = BoardStorage;
