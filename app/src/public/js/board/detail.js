'use strict';

const bbrdseq = document.querySelector('#bbrd-seq'),
  title = document.querySelector('#title'),
  contents = document.querySelector('#contents'),
  bbrdType = document.querySelector('#bbrd-type'),
  bbrdNtYn = document.querySelector('#bbrd-nt-yn'),
  modifyBtn = document.querySelector('#button');

modifyBtn.addEventListener('click', modify);

function modify() {
  if (!title.value) return alert('제목을 입력해주십시오.');
  if (!contents.value) return alert('내용을 입력해주십시오.');

  const req = {
    BBRD_SEQ: bbrdseq.value,
    TITLE: title.value,
    CONTENTS: contents.value,
    BBRD_TYPE: bbrdType.value,
    BBRD_NT_YN: bbrdNtYn.checked ? 'Y' : 'N',
  };

  fetch('/board/modify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.join())
    .then((res) => {
      if (res.success) {
        alert('수정되었습니다.');
        location.href = '/board/list';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('글 수정 중 에러 발생'));
    });
}
