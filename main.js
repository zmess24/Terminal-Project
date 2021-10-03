console.log("JS Loaded");

/**
 * Helper Functions + Global Variables
 */

let  currentString = '';


const commandMap = { 
    ls: 'Found LS' 
};

function createNewLine() {
    let li = document.createElement('li');
    currentString = '';
    li.innerHTML = `<span class="prompt">[zacharymessinger] </span><span>${currentString}</span>`;
    document.querySelector('ul').appendChild(li);
};

function appendCurrentLine(value) {
    let currentLine = document.querySelector('li:last-child span:last-child');
    currentString = value === 'backspace' ? currentString.slice(0, currentString.length-1) : currentString + value;
    currentLine.innerText = currentString;
};

document.addEventListener('keydown', ({ key, code }) => {
    if (code === "Enter") createNewLine();
    if (code === 'Space') appendCurrentLine(' ');
    if (code === "Backspace") appendCurrentLine('backspace');
    if (code.indexOf('Key') > -1) appendCurrentLine(key);
});