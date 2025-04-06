const display = document.querySelector(".display-text");

const buttons = document.querySelectorAll(".btn");

const numbers = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    zero: "0",
};

const operations = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
};

function updateDisplay() {
    if (calculator.secondNum) {
        display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
    } else if (calculator.operator && !calculator.secondNum) {
        display.textContent = calculator.firstNum + operations[calculator.operator];
    } else if (calculator.firstNum && !calculator.operator) {
        display.textContent = calculator.firstNum;
    }
}


// ADD number to current variable
function numberInput(id) {
    if (!calculator.firstNum) {
        calculator.firstNum = numbers[id];
        updateDisplay();
    } else if (calculator.answer && !calculator.operator) {
        calculator.answer = null;
        calculator.firstNum = numbers[id];
        updateDisplay();
    } else if (calculator.firstNum && !calculator.operator){
        calculator.firstNum += numbers[id];
        updateDisplay();
    } else if (calculator.firstNum && calculator.operator && !calculator.secondNum) {
        calculator.secondNum = numbers[id];
        updateDisplay();
    } else if (calculator.firstNum && calculator.operator && calculator.secondNum) {
        calculator.secondNum += numbers[id];
        updateDisplay();
    }
}


// TRANSFORM current number to positive/negative
function posnegInput() {
    if (calculator.secondNum) {
        calculator.secondNum = (calculator.secondNum * -1).toString();
        updateDisplay();
    } else if (calculator.firstNum && calculator.operator && !calculator.secondNum) {
        calculator.secondNum = "-";
        updateDisplay;
    } else if (calculator.firstNum && !calculator.operator) {
        calculator.firstNum = (calculator.firstNum * -1).toString();
        updateDisplay();
    } else if (!calculator.firstNum) {
        calculator.firstNum = "-";
        updateDisplay();
    }
}


// ADD decimal point to current number
function decimalInput() {
    if (calculator.secondNum) {
        if (calculator.secondNum.includes('.')) {
            // DO NOTHING
        } else {
            calculator.secondNum += ".";
            updateDisplay();
        }
    } else if (calculator.firstNum && calculator.operator && !calculator.secondNum) {
        calculator.secondNum = "0.";
        updateDisplay();
    } else if (calculator.firstNum && !calculator.operator) {
        if (calculator.firstNum.includes('.')) {
            // DO NOTHING
        } else {
            calculator.firstNum += ".";
            updateDisplay();
        }
    } else if (!calculator.firstNum) {
        calculator.firstNum = "0.";
        updateDisplay();
    }
}


// ADD operator for calculation
function operatorInput(id) {
    if (calculator.operator && calculator.secondNum) {
        calculateInput();
        calculator.operator = id;
        updateDisplay();
    } else if (calculator.firstNum ) {
        calculator.operator = id;
        updateDisplay();
    }
}

// PERFORM calculation
function calculateInput() {
    if (calculator.operator === "divide" && parseFloat(calculator.secondNum) === 0) {
        clearInput();
        display.textContent = "80085";
    } else {
        calculator.answer = calculator.calculate(calculator.operator, calculator.firstNum, calculator.secondNum);
        calculator.firstNum = calculator.answer.toString();
        calculator.secondNum = null;
        calculator.operator = null;
        display.textContent = calculator.answer; 
    }
}

// RESET all variables
function clearInput() {
    calculator.firstNum = null;
    calculator.secondNum = null;
    calculator.operator = null;
    calculator.answer = null;
    display.textContent = "";
}


// DELETE a number or operator
function deleteInput() {
    if (calculator.secondNum) {
        if (calculator.secondNum.length === 1) {
            calculator.secondNum = null;
            updateDisplay();
        } else {
        calculator.secondNum = calculator.secondNum.slice(0, -1);
        updateDisplay();
        }
    } else if (calculator.operator && !calculator.secondNum) {
        calculator.operator = null;
        updateDisplay();
    } else if (calculator.firstNum && !calculator.operator) {
       if (calculator.firstNum.length === 1) {
        calculator.firstNum = null;
        display.textContent = "";
       } else {
        calculator.firstNum = calculator.firstNum.slice(0, -1);
        updateDisplay();
       }
    }
}


// EVENT listener for buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.id in numbers) {
            numberInput(button.id);
        } else if (button.id in operations) {
            operatorInput(button.id);
        } else if (button.id === "calculate") {
            calculateInput();
        } else if (button.id === "clear") {
            clearInput();
        } else if (button.id === "delete") {
            deleteInput();
        } else if (button.id === "posneg") {
            posnegInput();
        } else if (button.id === "decimal") {
            decimalInput();
        }
    });
});

// DECLARE calculator object w/ variables and methods
const calculator = {
    firstNum: null,
    operator: null,
    secondNum: null,
    answer: null,

    add: function(a, b) {
        return a + b;
    },

    subtract: function(a, b) {
        return a - b;
    },

    multiply: function(a, b) {
        return a * b;
    },

    divide: function(a, b) {
        return a / b;
    },

    calculate: function(operator, firstNum, secondNum) {
        if (firstNum.includes('.') || secondNum.includes('.')) {
            return calculator[operator](parseFloat(firstNum), parseFloat(secondNum)).toFixed(4);
        } else {
            return calculator[operator](parseInt(firstNum), parseInt(secondNum));
        }
    }, 
};