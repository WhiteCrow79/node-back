'use strict';

const bbrdSeq = document.querySelector('#bbrd-seq'),
  title = document.querySelector('#title'),
  contents = document.querySelector('#contents'),
  bbrdType = document.querySelector('#bbrd-type'),
  bbrdNtYn = document.querySelector('#bbrd-nt-yn'),
  modifyBtn = document.querySelector('#button'),
  deleteBtn = document.querySelector('#delBtn');

modifyBtn.addEventListener('click', modify);
deleteBtn.addEventListener('click', del);

function del() {
  let bbrdseq = bbrdSeq.value;
  fetch('/board/delete/' + bbrdseq, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'apllication/json',
    },
    // body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert('삭제되었습니다.');
        location.href = '/board/list';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('글 삭제 중 에러 발생'));
    });
}

function modify() {
  if (!title.value) return alert('제목을 입력해주십시오.');
  if (!contents.value) return alert('내용을 입력해주십시오.');

  const req = {
    BBRD_SEQ: bbrdSeq.value,
    TITLE: title.value,
    CONTENTS: contents.value,
    BBRD_TYPE: bbrdType.value,
    BBRD_NT_YN: bbrdNtYn.checked ? 'Y' : 'N',
  };

  console.log(req);

  fetch('/board/modify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
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
