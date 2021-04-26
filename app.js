
// const http = require('http');
// const app = http.createServer((req, res) => {
    
//     // 한글깨짐
//     res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
//     console.log(req.url);

//     if(req.url === '/') {
//         res.end('여기는 루트 입니다.');
//     } else if(req.url === '/login') {
//         res.end('여기는 로그인 화면입니다.');
//     }

// });

// app.listen(3001, () => {
//     console.log('http로 가동된 서버');
// });
      
const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        여기는 루트입니다.
    </body>
    </html>
    `);
});

app.get('/login', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <input type="text" placeholder="아이디"><br>
        <input type="text" placeholder="비밀번호"><br>
        <button>로그인</button>
    </body>
    </html>
    `);
})

app.listen(3000, () => console.log('서버 가동'));