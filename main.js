console.log("JS Loaded");

/**
 * Helper Functions + Global Variables
 */

let currentString = '[zacharymessinger] ';
const commandMap = { 
    ls: 'Found LS' 
};

function createNewLine() {
    let li = document.createElement('li');
    currentString = '[zacharymessinger] ';
    li.innerText = currentString;
    document.querySelector('ul').appendChild(li);
};

function appendCurrentLine(value) {
    let currentLine = document.querySelector('li:last-child');
    currentString = currentString + value;
    currentLine.innerText = currentString;
};

document.addEventListener('keydown', ({ key, code }) => {
    if (code === "Enter") { createNewLine() };
    if (code === 'Space') appendCurrentLine(' ');
    if (code.indexOf('Key') > -1) appendCurrentLine(key);
});