'use strict';

const title = document.querySelector('#title'),
  contents = document.querySelector('#contents'),
  bbrdType = document.querySelector('#bbrd-type'),
  bbrdNtYn = document.querySelector('#bbrd-nt-yn'),
  writeBtn = document.querySelector('#button');

writeBtn.addEventListener('click', write);

function write() {
  if (!title.value) return alert('제목을 입력해주십시오.');
  if (!contents.value) return alert('내용을 입력해주십시오.');

  const req = {
    TITLE: title.value,
    CONTENTS: contents.value,
    BBRD_TYPE: bbrdType.value,
    BBRD_NT_YN: bbrdNtYn.checked ? 'Y' : 'N',
  };

  fetch('/board/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success) {
        alert('등록되었습니다.');
        location.href = '/board/list';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('글 등록 중 에러 발생'));
    });
}
