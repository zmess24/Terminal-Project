console.log("JS Loaded");

/**
 * Helper Functions + Global Variables
 */

let 
    prompt = '[zacharymessinger]';
    currentString = '';


const commandMap = { 
    ls: 'Found LS' 
};

function createNewLine() {
    let li = document.createElement('li');
    let line = `${prompt} ${currentString}`;
    li.innerText = line;
    document.querySelector('ul').appendChild(li);
};

function appendCurrentLine(value) {
    let currentLine = document.querySelector('li:last-child');
    currentString = currentString + value;
    currentLine.innerText = `${prompt} ${currentString}`;
};

function backSpace() {
    let currentLine = document.querySelector('li:last-child');
    currentString = currentString.slice(0, currentString.length-1);
    currentLine.innerText = `${prompt} ${currentString}`;
}

document.addEventListener('keydown', ({ key, code }) => {
    if (code === "Enter") createNewLine();
    if (code === 'Space') appendCurrentLine(' ');
    if (code === "Backspace") backSpace();
    if (code.indexOf('Key') > -1) appendCurrentLine(key);
});