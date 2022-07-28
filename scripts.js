const calculation = {
  num1: null,
  num2: null,
  operator: null,
  result: null,
};

function add(x, y) {
  let result = x + y;
  return result;
}

function subtract(x, y) {
  let result = x - y;
  return result;
}

function multiply(x, y) {
  let result = x * y;
  return result;
}

function divide(x, y) {
  let result = x / y;
  return result;
}

function operate(operator, x, y) {
  let result = null;
  if (operator === "+") {
    result = add(x, y);
  }
  else if (operator === "-") {
    result = subtract(x, y);
  }
  else if (operator === "*") {
    result = multiply(x, y);
  }
  else if (operator === "/") {
    result = divide(x, y);
  }
  return result;
}

function populateDisplay(number) {
  const display = document.querySelector(".display");
  displayText = display.textContent;
  //add number to display content
  let newText = "";
  newText = displayText + number;
  //display total number
  display.textContent = newText;
  if (calculation.operator) {
    calculation.num2 = parseInt(newText);
  }
  else {
    calculation.num1 = parseInt(newText);
  }
}

function clearDisplay() {
  const display = document.querySelector(".display");
  display.textContent = "";
}

let numButtons = document.querySelectorAll(".numButton");
numButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    populateDisplay(e.target.textContent);
  });
});

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function(e) {
  clearDisplay();
  calculation.num1 = null;
  calculation.num2 = null;
  calculation.operator = null;
});

let opButtons = document.querySelectorAll("#operator");
opButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    calculation.operator = e.target.textContent;
    clearDisplay();
  });
});

let equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", function(e) {
  calculation.result = operate(calculation.operator, calculation.num1, calculation.num2);
  const display = document.querySelector(".display");
  display.textContent = calculation.result;
});
