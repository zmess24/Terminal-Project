console.log("JS Loaded");
import { File } from './File';
import { FileSystem } from './FileSystem'

// Global Varialbes
let command = '', commandHistory = [];

const map = new FileSystem();
map.add(new File('Zac', "~", true));
map.add(new File('.bash_profile', '~'));
console.log(map.directory);

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
    let results = map.currentDir.content.reduce((prev, curr) => { return `${prev} ${curr.name}` }, '')
    createResultLine(results);
};

function mkdir(name) {
    let file = new File(name, map.currentPath, true);
    map.add(file);
};

function cd(dir) {
    debugger;
    let found = map.currentDir.content.find(d => d.name === dir);
    found ? map.changeDir(found) : commandNotFound(`cd: ${dir}: No such file or directory`);
};

// Helper Functions

function createNewPrompt() {
    let li = document.createElement('li');
    command = '';
    li.innerHTML = `<span class="prompt">[zacharymessinger] <span class="currentPath">${map.currentPath}</span> </span><span class="command">${command}</span> <div class="pointer"></div>`;
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
    debugger;
    command = character === 'backspace' ? command.slice(0, command.length-1) : command + character;
    debugger;
    currentLine.textContent = command;
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
        if (code === "Enter") executeCommand();
        if (code === 'Space') appendCommand(key);
        if (code === "Backspace") appendCommand('backspace');
        debugger;
        if (key.match(/\W|_|[0-9]|[[a-zA-Z]/g) && key.length === 1) appendCommand(key);
    });
});