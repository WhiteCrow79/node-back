'use strict';

const userId = document.querySelector('#user-id'),
  userPass = document.querySelector('#user-pass'),
  loginBtn = document.querySelector('#button');

loginBtn.addEventListener('click', login);

function login() {
  if (!userId.value) return alert('아이디를 입력해주십시오.');
  if (!userPass.value) return alert('비밀번호를 입력하여 주세요.');

  const req = {
    USER_ID: userId.value,
    USER_PASS: userPass.value,
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('로그인 중 에러 발생'));
    });
}
