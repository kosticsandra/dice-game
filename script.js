'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let highScore1 = document.getElementById('score--0');
let highScore2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

let score = 0;
let activePlayer = 0;
let totalScores = [0, 0];

let playing = true;

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting conditions
function initialValues() {
  highScore1.textContent = 0;
  highScore2.textContent = 0;
  dice.classList.add('hidden');
}
function switchPlayer() {
  score = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function resetPlayers() {
  initialValues();
  playing = true;
  score = 0;
  totalScores = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}

function setCurrentScore(score) {
  document.getElementById(`current--${activePlayer}`).textContent = score;
}

initialValues();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const rollDice = Math.trunc(Math.random() * 6 + 1);
    //Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${rollDice}.png`;

    //Check for rolled 1: if true, switch to next player

    if (rollDice !== 1) {
      //Add dice to current score
      score += rollDice;
      setCurrentScore(score);
    } else {
      setCurrentScore(0);
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += score;

    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      setCurrentScore(0);
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  resetPlayers();
});
