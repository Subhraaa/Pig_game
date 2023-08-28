'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById('score--1'); //getelementById is more faster than the queryselector
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing; 

const init = function(){
//starting condition
current0El.textContent = 0;
current1El.textContent = 0;
score0El.textContent = 0;
score1El.textContent = 0; //js will convert these to string automatically to be displayed on screen
diceEl.classList.add('hidden');//to hide the dice in the beginning


scores = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = true; //state var indicating the current status of game

player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active'); 
player1El.classList.remove('player--active'); 
}


init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;//at this point active player is still the one in if condition
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    //to change the background colour accordingly
    player0El.classList.toggle('player--active'); 
    player1El.classList.toggle('player--active'); 
};

//rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
    //1. generating random number
    const dice = Math.trunc(Math.random()*6)+1;

    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //similar to html img src

    //3.check for rolled 1: if true, switch to next player
    if(dice !== 1){
    //add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    } else{
    //switch to next player
    switchPlayer();
    }
}
}); 
btnHold.addEventListener('click',function(){
    if(playing){
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore; 
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2.check if score is already >=100
    if(scores[activePlayer] >= 20) {
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    }
    //3. Finish the game
    //4.switch to next player
    else{
    switchPlayer();
    }
}
});

btnNew.addEventListener('click', function(){


init();


});