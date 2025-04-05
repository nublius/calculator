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
    if (id in numbers) {
        // IF firstNum exists, concatenate
        if (calculator.firstNum === null) {
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
}

function operatorInput(id) {
    calculator.operator = id;
    display.textContent = calculator.firstNum + operations[id];
}

function calculateInput(id) {
    calculator.answer = calculator.calculate(calculator.operator, calculator.firstNum, calculator.secondNum);
    display.textContent = calculator.answer;
}


// EVENT listener for buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.id in numbers) {
            numberInput(button.id);
        } else if (button.id in operations) {
            operatorInput(button.id);
        } else if (button.id = "calculate") {
            calculateInput(button.id);
        }
    });
});

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
        return calculator[operator](parseInt(firstNum), parseInt(secondNum));
    }, 
};