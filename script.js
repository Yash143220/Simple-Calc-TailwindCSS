const display = document.getElementById("result");
const buttons = document.querySelectorAll("button[data-value]");
const clearBtn = document.getElementById("clear");
const allClearBtn = document.getElementById("all-clear");
const equalsBtn = document.getElementById("equals");

let currentInput = "";
let total = 0;
let operator = null;

function updateDisplay(value) {
    display.innerText = value;
}

function applyOperation() {
    if (currentInput === "") return;

    const num = parseFloat(currentInput);
    if (operator === "+") {
        total += num;
    } else if (operator === "-") {
        total -= num;
    } else if (operator === "*") {
        total *= num;
    } else if (operator === "/") {
        total /= num;
    } else if (operator === "%") {
        total %= num;
    } else {
        total = num;
    }

    updateDisplay(total);
    currentInput = "";
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (!isNaN(value) || value === ".") {
            currentInput += value;
            updateDisplay(currentInput);
        } else if (["+", "-", "*", "/", "%"].includes(value)) {
            applyOperation();
            operator = value;
        }
    });
});

equalsBtn.addEventListener("click", () => {
    applyOperation();
    operator = null;
});

clearBtn.addEventListener("click", () => {
    currentInput = "";
    updateDisplay("0");
});

allClearBtn.addEventListener("click", () => {
    currentInput = "";
    total = 0;
    operator = null;
    updateDisplay("0");
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        currentInput += key;
        updateDisplay(currentInput);
    }

    else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        applyOperation();
        operator = key;
    }

    else if (key === "Enter" || key === "=") {
        applyOperation();
        operator = null;
    }

    else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || "0");
    }

    else if (key === "Escape") {
        currentInput = "";
        total = 0;
        operator = null;
        updateDisplay("0");
    }
});
