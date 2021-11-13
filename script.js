'use strict';

//Possible success cases
const successAPI = {
  a: [1, 2, 3],
  b: [4, 5, 6],
  c: [7, 8, 9],
  d: [1, 4, 7],
  e: [2, 5, 8],
  f: [3, 6, 9],
  g: [1, 5, 9],
  h: [3, 5, 7],
};

//player1
const playerXContainer = document.querySelector('.container-one');
const playerXDisplay = document.querySelector('.player-x__title');
let playerXactive = true;

//player2
const playerOContainer = document.querySelector('.container-three');
const playerODisplay = document.querySelector('.player-o__title');
let playerOactive = false;

//footer
const footer = document.querySelector('.footer__title');

//info
const infoContainer = document.querySelector('.info');

//grid
const gridConatiner = document.querySelector('.grid__container');
const gridBtn = document.querySelectorAll('.grid__item-btn');

gridBtn.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    const box = e.target;
    const gridItem = box.closest('.grid__item');
    const active = box.attributes.class.textContent.split(' ')[1];

    if (active) return;

    if (playerXactive) {
      box.textContent = 'X';
      box.classList.add('player-one');
    }
    if (playerOactive) {
      box.textContent = 'O';
      box.classList.add('player-two');
    }

    playerXactive = !playerXactive;
    playerOactive = !playerOactive;
  })
);

footer.addEventListener('click', function () {
  infoContainer.classList.toggle('hidden');
  infoContainer
    .querySelector('.info__remove')
    .addEventListener('click', () => infoContainer.classList.add('hidden'));
});
