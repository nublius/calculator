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

function numberInput(id) {
    if (calculator.firstNum === null) {
        calculator.firstNum = numbers[id];
        display.textContent = calculator.firstNum;
    } else if (calculator.answer && !calculator.operator) {
        calculator.answer = null;
        calculator.firstNum = numbers[id];
        display.textContent = calculator.firstNum;
    } else if (calculator.firstNum != null && calculator.operator === null){
        calculator.firstNum += numbers[id];
        display.textContent = calculator.firstNum;
    } else if (calculator.firstNum && calculator.operator && calculator.secondNum === null) {
        calculator.secondNum = numbers[id];
        display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
    } else if (calculator.firstNum && calculator.operator && calculator.secondNum) {
        calculator.secondNum += numbers[id];
        display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
    }
}

function posnegInput() {
    if (calculator.secondNum) {
        calculator.secondNum *= -1;
        display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
    } else if (calculator.firstNum && !calculator.operator) {
        calculator.firstNum *= -1;
        display.textContent = calculator.firstNum;
    }
}

function decimalInput() {
    if (calculator.secondNum) {
        if (calculator.secondNum.includes('.')) {
            acInput();
            display.textContent = "ERROR!";
        } else {
            calculator.secondNum += ".";
            display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
        }
    } else if (calculator.firstNum && calculator.operator && !calculator.secondNum) {
        calculator.secondNum = "0.";
        display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
    } else if (calculator.firstNum && !calculator.operator) {
        if (calculator.firstNum.includes('.')) {
            acInput();
            display.textContent = "ERROR!";
        } else {
            calculator.firstNum += ".";
            display.textContent = calculator.firstNum;
        }
    } else if (!calculator.firstNum) {
        calculator.firstNum = "0.";
        display.textContent = calculator.firstNum;
    }
}

function operatorInput(id) {
    if (calculator.operator && calculator.secondNum) {
        calculateInput();
    } else {
        calculator.operator = id;
        display.textContent = calculator.firstNum + operations[id];
    }
}

function calculateInput() {
    if (calculator.operator === "divide" && calculator.secondNum === "0") {
        display.textContent = "80085";
    } else {
        calculator.answer = calculator.calculate(calculator.operator, calculator.firstNum, calculator.secondNum);
        calculator.firstNum = calculator.answer;
        calculator.secondNum = null;
        calculator.operator = null;
        display.textContent = calculator.answer; 
    }
}

function acInput() {
    calculator.firstNum = null;
    calculator.secondNum = null;
    calculator.operator = null;
    calculator.answer = null;
    display.textContent = "";
}

function deleteInput() {
    if (calculator.secondNum != null) {
        if (calculator.secondNum.length === 1) {
            calculator.secondNum = null;
            display.textContent = calculator.firstNum + operations[calculator.operator];
        } else {
        calculator.secondNum = calculator.secondNum.slice(0, -1);
        display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
        }
    } else if (calculator.operator != null && calculator.secondNum === null) {
        calculator.operator = null;
        display.textContent = calculator.firstNum;
    } else if (calculator.firstNum != null && calculator.operator === null) {
       if (calculator.firstNum.length === 1) {
        calculator.firstNum = null;
        display.textContent = "";
       } else {
        calculator.firstNum = calculator.firstNum.slice(0, -1);
        display.textContent = calculator.firstNum;
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
            acInput();
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
        firstNum = firstNum.toString();
        secondNum = secondNum.toString();
        if (firstNum.includes('.') || secondNum.includes('.')) {
            return calculator[operator](parseFloat(firstNum), parseFloat(secondNum));
        } else {
            return calculator[operator](parseInt(firstNum), parseInt(secondNum));
        }
    }, 
};