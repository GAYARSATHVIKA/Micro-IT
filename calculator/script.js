// Create particles container
const particlesContainer = document.createElement('div');
particlesContainer.className = 'particles';
document.body.appendChild(particlesContainer);

// Create particles
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Create audio elements
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
const operatorSound = new Audio('https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3');
const equalsSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
const clearSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');

// Set volume
clickSound.volume = 0.3;
operatorSound.volume = 0.3;
equalsSound.volume = 0.3;
clearSound.volume = 0.3;

let result = document.getElementById('result');
let currentInput = '';
let currentOperator = '';
let previousInput = '';

// Function to play sound
function playSound(type) {
    switch(type) {
        case 'number':
            clickSound.currentTime = 0;
            clickSound.play();
            break;
        case 'operator':
            operatorSound.currentTime = 0;
            operatorSound.play();
            break;
        case 'equals':
            equalsSound.currentTime = 0;
            equalsSound.play();
            break;
        case 'clear':
            clearSound.currentTime = 0;
            clearSound.play();
            break;
    }
}

// Add click event listeners to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;
        
        // Play appropriate sound based on button type
        if (this.classList.contains('number')) {
            playSound('number');
            handleNumber(value);
        } else if (this.classList.contains('operator')) {
            playSound('operator');
            handleOperator(value);
        } else if (this.classList.contains('equals')) {
            playSound('equals');
            calculate();
        } else if (this.classList.contains('clear')) {
            playSound('clear');
            clear();
        }
    });
});

function handleNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    }
    
    currentOperator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (currentInput === '' || previousInput === '') return;
    
    let calculation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch(currentOperator) {
        case '+':
            calculation = prev + current;
            break;
        case '-':
            calculation = prev - current;
            break;
        case '×':
            calculation = prev * current;
            break;
        case '÷':
            calculation = prev / current;
            break;
        case '%':
            calculation = prev % current;
            break;
        default:
            return;
    }
    
    currentInput = calculation.toString();
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function clear() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    result.value = currentInput || '0';
} 