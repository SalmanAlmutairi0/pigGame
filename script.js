'use strict';

let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diseEl = document.querySelector('.dice');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore = 0;
let holdScore0 = 0;
let holdScore1 = 0;

let playing = true;
const rollDice = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

// switching players
const switchPlayer = function (playerEl) {
  if (playerEl == player0El) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else if (playerEl == player1El) {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
};

const playersTurn = function (currentScoreEl, playerEl) {
  playerEl.classList.add('player--active');
  const roll = rollDice();
  console.log(roll);
  diseEl.src = `dice-${roll}.png`;
  diseEl.classList.remove('hidden');
  if (roll !== 1) {
    currentScore += roll;
    currentScoreEl.textContent = currentScore;
  } else {
    currentScore = 0;
    currentScoreEl.textContent = currentScore;
    switchPlayer(playerEl);
  }
};

score0El.textContent = 0;
score1El.textContent = 0;
diseEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  // determine how's playing
  if (playing) {
    if (player0El.classList.contains('player--active')) {
      playersTurn(currentScore0El, player0El);
    } else {
      playersTurn(currentScore1El, player1El);
    }

  }
});

const winScore = 100
btnHold.addEventListener('click', function () {
  if (playing) {
    if (player0El.classList.contains('player--active')) {
      holdScore0 += currentScore;

      score0El.textContent = holdScore0;

      currentScore = 0;

      currentScore0El.textContent = currentScore;

      if (holdScore0 >= winScore) {
        playing = false;
        diseEl.classList.add('hidden');
        player0El.classList.add('player--winner');
      } else {
        switchPlayer(player0El);
      }
    } else {
      holdScore1 += currentScore;

      score1El.textContent = holdScore1;

      currentScore = 0;

      currentScore1El.textContent = currentScore;

      if (holdScore1 >= winScore) {
        playing = false;
        diseEl.classList.add('hidden');
        player1El.classList.add('player--winner');
      } else {
        switchPlayer(player1El);
      }
    }
  }
});


btnNew.addEventListener('click', function () {
  playing = true;
  holdScore0 = 0;
  holdScore1 = 0;
  currentScore = 0;
  score0El.textContent = holdScore0;
  score1El.textContent = holdScore1;
  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  switchPlayer(player1El);
  diseEl.classList.add('hidden');
});
