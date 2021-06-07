'use strict';

const writeBtn = document.querySelector('#write'),
  detailMove = document.querySelectorAll('td');

detailMove.forEach(($tr) => {
  $tr.addEventListener('click', detail);
});
writeBtn.addEventListener('click', write);

function write() {
  location.href = '/board/write';
}

function detail() {
  let bbrdseq = this.parentNode.dataset.bbrdseq;

  console.log(bbrdseq);

  location.href = '/board/detail/' + bbrdseq;

  // const req = {
  //   BBRD_SEQ: bbrdseq,
  // };
  // fetch('/board/detail', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(req),
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     if (res.success) {
  //       res.render('board/list', { data: res });
  //     } else {
  //       alert(res.msg);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(new Error('Error'));
  //   });
}
