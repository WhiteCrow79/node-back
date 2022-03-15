'use strict';

const db = require('../config/db');

class BloodStorage {
  //등록
  static async write(bloodInfo) {
    const sessionInfo = bloodInfo.USER_INFO;

    return new Promise((resolve, reject) => {
      //session 정보가 없다면 reject
      if (!sessionInfo) {
        reject('로그인 정보가 없습니다.');
      }

      const query = `
    INSERT INTO BLOOD_PRESSURE (
        USER_ID, 
        SYSTOLIC,
        DIASTOLIC,
        REG_DATE,
        REG_USER_ID,
        CHG_DATE,
        CHG_USER_ID
        )
    VALUES (
        ?,
        ?,
        ?,
        NOW(),
        ?,
        NOW(),
        ?
        )`;
      db.query(
        query,
        [
          sessionInfo.userId,
          bloodInfo.SYSTOLIC,
          bloodInfo.DIASTOLIC,
          sessionInfo.userId,
          sessionInfo.userId,
        ],
        (err, data) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = BloodStorage;
