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

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // CHECK for input
        if (button.id in numbers) {
            // IF firstNum exists, concatenate
            if (calculator.firstNum === null) {
                calculator.firstNum = numbers[button.id];
                display.textContent = calculator.firstNum;
            } else if (calculator.firstNum != null && calculator.operator === null){
                calculator.firstNum += numbers[button.id];
                display.textContent = calculator.firstNum;
            } else if (calculator.firstNum && calculator.operator && calculator.secondNum === null) {
                calculator.secondNum = numbers[button.id];
                display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
            } else if (calculator.firstNum && calculator.operator && calculator.secondNum) {
                calculator.secondNum += numbers[button.id];
                display.textContent = calculator.firstNum + operations[calculator.operator] + calculator.secondNum;
            }
        // IF input is operator, move onto populating calculator.operator
        } else if (button.id in operations) {
            calculator.operator = button.id;
            console.log(calculator);
            display.textContent = calculator.firstNum + operations[button.id];
        } 
    });
});

const calculator = {
    firstNum: null,
    operator: null,
    secondNum: null,

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
        return operator(firstNum, secondNum);
    }, 
};