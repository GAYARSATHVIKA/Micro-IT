// Game variables
let targetNumber;
let attempts;
const maxAttempts = 10;

// DOM elements
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const newGameButton = document.getElementById('new-game-button');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');

// Initialize the game
function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    updateAttempts();
    messageElement.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
}

// Update attempts display
function updateAttempts() {
    attemptsElement.textContent = `Attempts: ${attempts}/${maxAttempts}`;
}

// Check the guess
function checkGuess() {
    const guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100';
        return;
    }

    attempts++;
    updateAttempts();

    // Check if the guess is correct
    if (guess === targetNumber) {
        messageElement.textContent = `Congratulations! You guessed the number in ${attempts} attempts!`;
        messageElement.style.color = 'green';
        endGame();
    } else if (attempts >= maxAttempts) {
        messageElement.textContent = `Game Over! The number was ${targetNumber}`;
        messageElement.style.color = 'red';
        endGame();
    } else {
        messageElement.textContent = guess < targetNumber ? 'Too low! Try again.' : 'Too high! Try again.';
        messageElement.style.color = '#666';
    }

    guessInput.value = '';
    guessInput.focus();
}

// End the game
function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
}

// Event listeners
guessButton.addEventListener('click', checkGuess);
newGameButton.addEventListener('click', initGame);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Start the game
initGame(); 