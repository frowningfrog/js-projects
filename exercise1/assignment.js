function alertMessage(message) {
    alert(message);
}

function getWelcomeMessage(name) {
    alert('Welcome, ' + name + '!');
}

function divide(a, b) {
    return (a / b);
}

function multiply(a, b) {
    return (a * b);
}

// using first function
alertMessage('greetings, programs')

// prompt for user input
const username = prompt('Enter your name:');

// use other functions
getWelcomeMessage(username);
alert(divide(10, 2));
alert(multiply(4, 5));