let randomNum = parseInt(Math.random() * 100 +1);

// All the requirements
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numOfGuess = 1;

let playGame = true;

if(playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault(); //You want to handle an event manually. You want to override the browser’s default behavior.
        const guess = parseInt(userInput.value);
        validateGuess(guess)
    });
}

function validateGuess(guess) {
    if(isNaN(guess)) {
        alert('Please enter a valid number');
    } else if(guess < 1) {
        alert('Please enter a number more than 1');
    } else if(guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess);
        
        if(numOfGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game Over Random number was ${randomNum}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if(guess === randomNum) {
        displayMessage(`You guessed it right `);
        endGame();
    } else if(guess < randomNum) {
        displayMessage(`Your number is TOO low`)
    } else if(guess > randomNum) {
        displayMessage(`Your number is TOO high`)
    }
}


function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    numOfGuess++;
    remaining.innerHTML = `${11 - numOfGuess}`;
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled',''); // to prevent from entering in form

    p.classList.add('button'); //dynamically added a button into a new para
    p.innerHTML = `<p id="newGame"> Start New Game</p>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e) {
        randomNum = parseInt(Math.random() *100 +1);
        prevGuess = [];
        numOfGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numOfGuess} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        displayMessage('');
        playGame = true;
    });
};