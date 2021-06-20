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
  const bbrdseq = this.parentNode.dataset.bbrdseq;
  location.href = '/board/detail/' + bbrdseq;

  // fetch('/board/detail/' + bbrdseq, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     if (res) {
  //       console.log(res);
  //     } else {
  //       alert(res.msg);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(new Error('Error'));
  //   });
}
