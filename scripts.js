const calculation = {
  num1: null,
  num2: null,
  operator: null,
  result: null,
  newOp: null,
};

const MAX_DISPLAY_LENGTH = 25;

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
  if (y === 0) {
    return "CANNOT DIVIDE BY 0";
  }
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

function roundNumber(number) {
  //determine total length of number
  let strNum = number.toString();
  let length = strNum.length;
  //if more than max, do stuff, else its okay
  if (length > MAX_DISPLAY_LENGTH) {
    //determine how many digits to left and right of decimal
    let integs = strNum.search(/\./);
    let decims = length - integs - 1;
    //round off digits to right of decimal to reach maximum length
    let desiredDecimals = MAX_DISPLAY_LENGTH - integs - 1;
    //the amount of decimals removed is equal to the power of 10
    let decPower = Math.pow(10, desiredDecimals);
    number = Math.round(number * decPower)/decPower;
    return number;
  }
  else {
    return number;
  }
}

function populateDisplay(number) {
  const display = document.querySelector(".display");
  let displayText;
  if (calculation.newOp) {
    clearDisplay();
    calculation.newOp = false;
  }
  displayText = display.textContent;
  //add number to display content
  let newText = "";
  newText = displayText + number;
  //display total number
  display.textContent = newText;
  //append 0 to front of leading decimal
  if (newText === ".") {
    newText = "0."
  }
  if (calculation.operator) {
    calculation.num2 = parseFloat(newText);
  }
  else {
    calculation.num1 = parseFloat(newText);
  }
}

function showOnDisplay(num) {
  const display = document.querySelector(".display");
  display.textContent = num;
}

function clearDisplay() {
  const display = document.querySelector(".display");
  display.textContent = "";
}

function clearValues() {
  calculation.num1 = null;
  calculation.num2 = null;
  calculation.operator = null;
  calculation.result = null;
  calculation.newOp = null;
}

function clear() {
  clearValues();
  clearDisplay();
}

function decimalPresent(text) {
  if (text.search(/\./) === -1) {
    //no period
    return false;
  }
  else {
    return true;
  }
}

function numButtonClick(text) {
  const displayText = document.querySelector(".display").textContent;
  //disable decimal if one is already present
  if (!(text === "." && decimalPresent(displayText))) {
    populateDisplay(text);
  }
}

function equalButtonClick() {
  let num1Present = false;
  let num2Present = false;
  if (calculation.num1 !== undefined) {
    num1Present = true;
  }
  if (calculation.num2 !== undefined) {
    num2Present = true;
  }
  if (calculation.operator && num1Present && num2Present) {
    let res = operate(calculation.operator, calculation.num1, calculation.num2);
    const display = document.querySelector(".display");
    if (typeof res === "string") {
      display.textContent = res;
    }
    else {
      display.textContent = roundNumber(res);
    }
    calculation.num1 = calculation.num2;
  }
}

function opButtonClick(text) {
  let secondOp = false;
  if (calculation.num1 && calculation.num2) {
    calculation.num1 = operate(calculation.operator, calculation.num1, calculation.num2);
    secondOp = true;
  }
  calculation.operator = text;
  if (secondOp) {
    showOnDisplay(calculation.num1);
  }
  else {
    clearDisplay();
  }
  calculation.newOp = true;
}

let numButtons = document.querySelectorAll(".numButton");
numButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    let text = e.target.textContent;
    numButtonClick(text);
  });
});

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function(e) {
  clear();
});

let opButtons = document.querySelectorAll("#operator");
opButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    let text = e.target.textContent;
    opButtonClick(text);
  });
});

let equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", function(e) {
  equalButtonClick();
});

function backspace() {
  const display = document.querySelector(".display");
  newDisplay = display.textContent.substring(0, display.textContent.length - 1);
  if (calculation.num2 === null) {
    //if no num2 yet
    calculation.num1 = newDisplay;
  }
  else {
    calculation.num2 = newDisplay;
  }
  console.log(newDisplay);
  showOnDisplay(newDisplay);
}

let bsButton = document.querySelector("#backspace");
bsButton.addEventListener("click", function(e) {
  backspace();
});

window.addEventListener("keydown", (event) => {
  const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "=", "+", "-", "*", "/", "Backspace", "Delete", "Enter"];
  const NUMKEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const OPKEYS = ["+", "-", "*", "/"];
  console.log(event.key)
  if (KEYS.includes(event.key)) {
    if (NUMKEYS.includes(event.key)) {
      numButtonClick(event.key);
    }
    else if (OPKEYS.includes(event.key)) {
      opButtonClick(event.key);
    }
    else if (event.key === "=" || event.key === "Enter") {
      equalButtonClick();
    }
    else if (event.key === "Delete") {
      clear();
    }
    else if (event.key === "Backspace") {
      backspace();
    }
  }
});
