let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendDot() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function updateDisplay() {
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    updateDisplay();
}

function operate(operation) {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (currentOperation) {
        secondOperand = parseFloat(currentInput);
        firstOperand = performCalculation(currentOperation, firstOperand, secondOperand);
        secondOperand = null;
    }
    currentOperation = operation;
    currentInput = '';
    updateDisplay();
}

function performCalculation(operation, first, second) {
    switch (operation) {
        case 'add':
            return first + second;
        case 'subtract':
            return first - second;
        case 'multiply':
            return first * second;
        case 'divide':
            return first / second;
        default:
            return second;
    }
}

function calculate() {
    if (currentInput === '' || firstOperand === null || currentOperation === null) return;
    secondOperand = parseFloat(currentInput);
    currentInput = performCalculation(currentOperation, firstOperand, secondOperand).toString();
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    updateDisplay();
}
