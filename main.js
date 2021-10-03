console.log("JS Loaded");

// Global Varialbes
let command = '', commandHistory = [];

const commandMap = { 
    help: {
        desc: 'Displays list of all commands',
        execute: help
    },
    clear: {
        desc: 'Clears the command line of previous commands',
        execute: clear
    },
    history: {
        desc: 'Shows history of commands entered',
        execute: history
    },
};

// Command Map Functions
function help() {
    var commands = Object.keys(commandMap).sort();
    commands.forEach(c => createResultLine(`${c}: ${commandMap[c].desc}`));
}

function clear() {
    document.querySelector('ul').innerHTML = '';
}

function history() {
    commandHistory.forEach((c, i) => createResultLine(`${i+1}: ${c}`));
}

// Helper Functions
function createNewPrompt() {
    let li = document.createElement('li');
    command = '';
    li.innerHTML = `<span class="prompt">[zacharymessinger] </span><span class="command">${command}</span><div class="pointer"></div>`;
    document.querySelector('ul').appendChild(li);
};

function createResultLine(line) {
    let li = document.createElement('li');
    li.innerText = line;
    document.querySelector('ul').appendChild(li);
} 

function appendCommand(character) {
    let currentLine = document.querySelector('li:last-child .command')
    command = character === 'backspace' ? command.slice(0, command.length-1) : command + character;
    currentLine.innerText = command;
};

function commandNotFound() {
    let message = `-bash: ${command}: command not found`;
    createResultLine(message);
};

function commandFound(command) {
    commandMap[command].execute()
};

function executeCommand() {
    let currentLine = document.querySelector('li:last-child');
    let pointer = document.querySelector('li:last-child .pointer');
    currentLine.removeChild(pointer);
    commandHistory.push(command);
    commandMap[command] ? commandFound(command) : commandNotFound();
    createNewPrompt();
};

/**
 * Main Script
 */

document.addEventListener("DOMContentLoaded", () => {
    createNewPrompt();

    document.addEventListener('keydown', ({ key, code }) => {
        if (code === "Enter") executeCommand();
        if (code === 'Space') appendCommand(' ');
        if (code === "Backspace") appendCommand('backspace');
        if (code.indexOf('Key') > -1) appendCommand(key);
    });
});