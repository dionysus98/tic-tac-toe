'use strict';

//?Possible success cases
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

//?player1
const playerXContainer = document.querySelector('.container-one');
const playerXDisplay = document.querySelector('.player-x__title');
let playerXactive = true;
let playerXData = [];
let playerXWin = false;
let playerXScore = 0;
let playerXshift = [];

//? player2
const playerOContainer = document.querySelector('.container-three');
const playerODisplay = document.querySelector('.player-o__title');
let playerOactive = false;
let playerOData = [];
let playerOWin = false;
let playerOScore = 0;
let playerOshift = [];

//? Footer
const footer = document.querySelector('.footer__title');
const reset = document.querySelector('.reset');
let resetActive = true;

//? Info
const infoContainer = document.querySelector('.info');

//? Grid
const gridConatiner = document.querySelector('.grid__container');
const gridBtn = document.querySelectorAll('.grid__item-btn');

//? App
gridBtn.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    const box = e.target;
    const { index } = box.dataset;

    //? Guard
    if (playerXWin || playerOWin) return;
    if (box.dataset.active) return;
    box.dataset.active = true;

    //? reset button activate
    if (resetActive) {
      reset.classList.remove('inactive');
      footer.classList.add('inactive');
    }

    //? Add X - O
    if (playerXactive) {
      box.textContent = 'X';
      box.classList.add('player-one');
      playerXData.push(+index);
    }
    if (playerOactive) {
      box.textContent = 'O';
      box.classList.add('player-two');
      playerOData.push(+index);
    }

    //? Compare X Value with Success API
    if (playerXData.length >= 3) {
      let sortX = playerXData.slice().sort((a, b) => a - b);
      Object.values(successAPI).forEach((api, index) => {
        let intersections = api.filter((e) => sortX.indexOf(e) !== -1);
        if (JSON.stringify(api) === JSON.stringify(intersections)) {
          console.log('X');
          playerXWin = !playerXWin;
          return;
        }
      });
    }

    //? Compare O Value with Success API
    if (playerOData.length >= 3) {
      let sortO = playerOData.slice().sort((a, b) => a - b);
      Object.values(successAPI).forEach((api, index) => {
        let intersections = api.filter((e) => sortO.indexOf(e) !== -1);
        if (JSON.stringify(api) === JSON.stringify(intersections)) {
          console.log('O');
          playerOWin = !playerOWin;
          return;
        }
      });
    }

    if (playerXWin || playerOWin) {
      resetActive = !resetActive;

      //? Player X Won
      if (playerXWin) {
        gridBtn.forEach((button) => {
          if (button.textContent === 'X') button.classList.add('winner');
          playerXContainer.classList.add('winner');
          playerOContainer.classList.add('loser');
          return;
        });
        playerXScore++;
        playerXDisplay.textContent = playerXScore;
      }

      //? Player O won
      if (playerOWin) {
        gridBtn.forEach((button) => {
          if (button.textContent === 'O') button.classList.add('winner');
          playerOContainer.classList.add('winner');
          playerXContainer.classList.add('loser');
          return;
        });
        playerOScore++;
        playerODisplay.textContent = playerOScore;
      }

      //?Auto Reset : 3 Sec
      setTimeout(() => {
        gridBtn.forEach((btn) => {
          btn.textContent = '';
          btn.dataset.active = '';
          btn.classList.remove('player-one');
          btn.classList.remove('player-two');
          btn.classList.remove('winner');
          playerXContainer.classList.remove('winner');
          playerXContainer.classList.remove('loser');
          playerOContainer.classList.remove('winner');
          playerOContainer.classList.remove('loser');
        });
        playerXactive = true;
        playerXData = [];
        playerXWin = false;
        playerOactive = false;
        playerOData = [];
        playerOWin = false;
      }, 3000);
      reset.classList.add('inactive');
      footer.classList.remove('inactive');
      resetActive = !resetActive;
    }

    //? Active Player
    playerXactive = !playerXactive;
    playerOactive = !playerOactive;
  })
);

//? Info Display
footer.addEventListener('click', function () {
  infoContainer.classList.toggle('hidden');
  infoContainer
    .querySelector('.info__remove')
    .addEventListener('click', () => infoContainer.classList.add('hidden'));
});

//? Reset
reset.addEventListener('click', function () {
  gridBtn.forEach((btn) => {
    btn.textContent = '';
    btn.dataset.active = '';
    btn.classList.remove('player-one');
    btn.classList.remove('player-two');
    btn.classList.remove('winner');
    playerXContainer.classList.remove('winner');
    playerXContainer.classList.remove('loser');
    playerOContainer.classList.remove('winner');
    playerOContainer.classList.remove('loser');
  });
  playerXactive = true;
  playerXData = [];
  playerXWin = false;
  playerOactive = false;
  playerOData = [];
  playerOWin = false;
});
