'use strict';

const userId = document.querySelector('#user-id'),
  userName = document.querySelector('#user-name'),
  userPass = document.querySelector('#user-pass'),
  confirmUserPass = document.querySelector('#confirm-user-pass'),
  userTel = document.querySelector('#user-tel'),
  registerBtn = document.querySelector('#button');

registerBtn.addEventListener('click', register);

function register() {
  if (!userId.value) return alert('아이디를 입력해주십시오.');
  if (userPass.value !== confirmUserPass.value)
    return alert('비밀번호가 일치하지 않습니다.');
  if (!userTel.value) return alert('전화번호를 입력해주십시오.');

  const req = {
    USER_ID: userId.value,
    USER_NAME: userName.value,
    USER_PASS: userPass.value,
    USER_TEL: userTel.value,
  };
  console.log(req);

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/login';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('회원가입 중 에러 발생'));
    });
}
