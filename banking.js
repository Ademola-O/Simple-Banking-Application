// Simple Banking System

// The current balance lives in a variable. It starts at 0.
let balance = 0;

// Find the elements on the page by their ids so we can read and change them.
const balanceDisplay  = document.getElementById("balance");
const amountInput     = document.getElementById("amount");
const transactionList = document.getElementById("transactions");

// Show the starting balance with two decimal places (0.00)
balanceDisplay.textContent = balance.toFixed(2);


// Reads the amount the user typed and checks it is valid.
// Returns the amount as a number, or null if it isn't valid.
function readAmount() {

    // .value is always text, so parseFloat turns it into a number.
    // An empty box becomes NaN ("not a number").
    let amount = parseFloat(amountInput.value);

    // Round to 2 decimal places so 10.567 can't sneak in as a strange amount
    amount = Math.round(amount * 100) / 100;

    // Reject anything that isn't a number, or isn't more than zero
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter an amount greater than 0.");
        return null;
    }

    return amount;
}


// Runs when the Deposit button is clicked (onclick="deposit()" in the HTML)
function deposit() {
    const amount = readAmount();
    if (amount === null) return;   // invalid input, so stop here

    // Add the money. Rounding to 2 decimals avoids tiny maths errors
    // like 0.1 + 0.2 = 0.30000000000000004.
    balance = Math.round((balance + amount) * 100) / 100;

    addTransaction("Deposited", amount);
    updateScreen();
}


// Runs when the Withdraw button is clicked (onclick="withdraw()" in the HTML)
function withdraw() {
    const amount = readAmount();
    if (amount === null) return;

    // You can't take out more than you have
    if (amount > balance) {
        alert("Insufficient funds. Your balance is $" + balance.toFixed(2) + ".");
        return;
    }

    balance = Math.round((balance - amount) * 100) / 100;

    addTransaction("Withdrew", amount);
    updateScreen();
}


// Adds one line to the transaction history list
function addTransaction(type, amount) {
    const item = document.createElement("li");

    // textContent treats the text as plain text, never as code
    item.textContent = type + " $" + amount.toFixed(2);

    // prepend puts the newest transaction at the top of the list
    transactionList.prepend(item);
}


// Refreshes the balance on screen and gets the input ready for the next amount
function updateScreen() {
    balanceDisplay.textContent = balance.toFixed(2);
    amountInput.value = "";
    amountInput.focus();
}