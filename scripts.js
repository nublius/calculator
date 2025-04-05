function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const calculator = {
    firstNum: null;
    operator: null;
    secondNum: null;
};

function operate(operator, firstNum, secondNum) {
   return operator(firstNum, secondNum);
}