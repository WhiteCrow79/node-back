'use strict';

const systolic = document.querySelector('#systolic'),
  diastolic = document.querySelector('#diastolic'),
  writeBtn = document.querySelector('#button');

writeBtn.addEventListener('click', write);

function write() {
  if (!systolic.value) return alert('수축기혈압을 입력해주십시오.');
  if (!diastolic.value) return alert('이완기혈압을 입력해주십시오.');

  const req = {
    SYSTOLIC: parseInt(systolic.value),
    DIASTOLIC: parseInt(diastolic.value),
  };

  fetch('/blood/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert('등록되었습니다.');
      } else {
        alert(res.err);
      }
    })
    .catch((err) => {
      console.error(new Error('혈압 등록 중 에러 발생'));
    });
}
