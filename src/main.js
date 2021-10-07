console.log("JS Loaded");

// Global Varialbes

let command = '', commandHistory = [], locationMap = {"~": {".bash_profile": {}, Zac: {}}}, currentDiretory = "~";

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
    ls: { 
        desc: "List contents of current working directory",
        execute: ls
    },
    mkdir: { 
        desc: "Make a new directory",
        execute: mkdir
    },
    cd: {
        desc: "Change current directory",
        execute: cd
    },
    pwd: {
        desc: "Print working directory",
        // execute: pwd
    }
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

function ls() {
    let map = currentDiretory.split('/');
    let evalString = map.reduce((prev, curr, i) => { return prev + `map[${i}]` }, "")
    debugger;
    let files = eval(`Object.keys(locationMap[${evalString}]).sort()`);
    let results = files.toString().replaceAll(',', '     ')
    createResultLine(results);
};

function mkdir(directory) {
    let map = currentDiretory;
};

function cd(path) {
    if (locationMap[currentDiretory][path]) { 
        currentDiretory = `${currentDiretory}/${path}`;
    } else {
        commandNotFound(`cd: ${path}: No such file or directory`)
    }
};

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

function commandNotFound(string) {
    let message = `-bash: ${string}`;
    createResultLine(message);
};

function commandFound(command, arg) {
    commandMap[command].execute(arg)
};

function executeCommand() {
    let currentLine = document.querySelector('li:last-child');
    let pointer = document.querySelector('li:last-child .pointer');
    currentLine.removeChild(pointer);
    let [func, arg] = command.split(' ');
    commandHistory.push(func);
    commandMap[func] ? commandFound(func, arg) : commandNotFound(`${func}: command not found`);
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
        if (code === 'Space') appendCommand(' ');
        if (code === "Backspace") appendCommand('backspace');
        if (code.indexOf('Key') > -1) appendCommand(key);
    });
});