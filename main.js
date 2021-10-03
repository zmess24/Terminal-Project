console.log("JS Loaded");

// Global Varialbes
let command = '';

const commandMap = { 
    ls: {},
    help: {},
    clear: {}
};

// Helper Functions
function createNewLine() {
    let li = document.createElement('li');
    command = '';
    li.innerHTML = `<span class="prompt">[zacharymessinger] </span><span class="command">${command}</span><div class="pointer"></div>`;
    document.querySelector('ul').appendChild(li);
};

function appendCurrentLine(character) {
    let currentLine = document.querySelector('li:last-child .command')
    command = character === 'backspace' ? command.slice(0, command.length-1) : command + character;
    currentLine.innerText = command;
};

function commandNotFound() {
    let li = document.createElement('li');
    li.innerText = `-bash: ${command}: command not found`
    document.querySelector('ul').appendChild(li);
    createNewLine();
};

function commandFound(command) {
    console.log(`${command} Found`);
};

function execute() {
    let currentLine = document.querySelector('li:last-child');
    let pointer = document.querySelector('li:last-child .pointer');
    currentLine.removeChild(pointer);
    commandMap[command] ? commandFound(command) : commandNotFound();
};

/**
 * Main Script
 */

document.addEventListener("DOMContentLoaded", () => {
    createNewLine();

    document.addEventListener('keydown', ({ key, code }) => {
        if (code === "Enter") execute();
        if (code === 'Space') appendCurrentLine(' ');
        if (code === "Backspace") appendCurrentLine('backspace');
        if (code.indexOf('Key') > -1) appendCurrentLine(key);
    });
});