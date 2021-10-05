console.log("JS Loaded");

// Global Varialbes

let command = '', commandHistory = [];

const commandMap = { 
    help: {
        desc: 'Display list of all available commands',
        execute: help
    },
    clear: {
        desc: 'Clear the command line of previous commands',
        execute: clear
    },
    history: {
        desc: 'Show history of all previous commands entered',
        execute: history
    },
};

// Command Map Functions

function clear() {
    document.querySelector('ul').innerHTML = '';
}

function help() {
    var commands = Object.keys(commandMap).sort();
    createResultLine('Available Commands:');
    let table = document.createElement('table');
    commands.forEach(c => { 
        let row = createTableRow(c, commandMap[c].desc, "100px");
        table.append(row);
    });

    createResultLine(table);
}

function history() {
    let table = document.createElement('table');
    commandHistory.forEach((c, i) => {
        let row = createTableRow(i+1, c, "25px");
        table.append(row);
    });

    createResultLine(table);
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
    li.append(line);
    document.querySelector('ul').appendChild(li);
}

function createTableCol(data) {
    let td = document.createElement('td');
    td.innerText = data;
    return td;
}

function createTableRow(colOne, colTwo, width = null) {
    let row = document.createElement('tr');
    let tdOne = createTableCol(colOne);
    let tdTwo = createTableCol(colTwo);
    if (width) tdOne.style.width = width;
    row.append(tdOne);
    row.append(tdTwo);
    return row;
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
        // console.log(key)
        if (code === "Enter") executeCommand();
        if (code === 'Space')   (' ');
        if (code === "Backspace") appendCommand('backspace');
        if (code.indexOf('Key') > -1) appendCommand(key);
    });
});