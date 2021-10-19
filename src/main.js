console.log("JS Loaded");
import { File } from "./File";
import { FileSystem } from "./FileSystem";

// Global Varialbes
let command = "",
  commandHistory = [];

const map = new FileSystem();
map.addDir("~/Zac");
map.addDir("/.bash_profile");
console.log(map.directory);

const commandMap = {
  help: {
    desc: "Display list of all available commands",
    execute: help,
  },
  clear: {
    desc: "Clear the command line of previous commands",
    execute: clear,
  },
  history: {
    desc: "Show history of all previous commands entered",
    execute: history,
  },
  ls: {
    desc: "List contents of current working directory",
    execute: ls,
  },
  mkdir: {
    desc: "Make a new directory",
    execute: mkdir,
  },
  cd: {
    desc: "Change current directory",
    execute: cd,
  },
  rm: {
    desc: "Removes file from a directory",
    execute: rm
  },
  cp: {
    desc: "Copies file a directory",
  },
  mv: {
    desc: "Moves file into a directory",
  },
  pwd: {
    desc: "Print working directory",
    execute: pwd
  },
};

// Command Map Functions

function clear() {
    document.querySelector("ul").innerHTML = "";
}

function help() {
    var commands = Object.keys(commandMap).sort();
    createResultLine("Available Commands:");
    let table = document.createElement("table");
    commands.forEach((c) => {
        let row = createTableRow(c, commandMap[c].desc, "100px");
        table.append(row);
    });

    createResultLine(table);
}

function history() {
    let table = document.createElement("table");
    commandHistory.forEach((c, i) => {
        let row = createTableRow(i + 1, c, "25px");
        table.append(row);
    });

    createResultLine(table);
}

function ls() {
  let results = map.currentDir.content.reduce((prev, curr) => {
        return `${prev} ${curr.name}`;
    }, "");
    createResultLine(results);
}

function mkdir(directories) {
    try {
        directories.forEach(filePath => map.addDir(filePath));
    } catch (err) {
        throwError(err.message)
    }
};

function cd(absolutePath) {
    try {
        map.changeDir(absolutePath[0])
    } catch (err) {
        throwError(err.message);
    }
};

function rm(absolutePath) {
    try {

    } catch (err) {
        throwError(err.message);
    }
}

function pwd() {
    createResultLine(map.currentPath)
};

function mv(sourceAndPath) {
    map.move(sourceAndPath);
}

// Helper Functions

function createNewPrompt() {
  let li = document.createElement("li");
  command = "";
  li.innerHTML = `<span class="prompt">[zacharymessinger] <span class="currentPath">${map.currentPath}</span> </span><span class="command">${command}</span> <div class="pointer"></div>`;
  document.querySelector("ul").appendChild(li);
}

function createResultLine(line) {
  let li = document.createElement("li");
  li.append(line);
  document.querySelector("ul").appendChild(li);
}

function createTableCol(data) {
  let td = document.createElement("td");
  td.innerText = data;
  return td;
}

function createTableRow(colOne, colTwo, width = null) {
  let row = document.createElement("tr");
  let tdOne = createTableCol(colOne);
  let tdTwo = createTableCol(colTwo);
  if (width) tdOne.style.width = width;
  row.append(tdOne);
  row.append(tdTwo);
  return row;
}

function appendCommand(key) {
  let currentLine = document.querySelector("li:last-child .command");
  command = key === "backspace" ? command.slice(0, command.length - 1) : command + key;
  currentLine.textContent = command;
}

function throwError(string) {
  let message = `-bash: ${string}`;
  createResultLine(message);
}

function commandFound(command, arg) {
  commandMap[command].execute(arg);
};

function executeCommand() {
  // Remove cursor from current line
  let currentLine = document.querySelector("li:last-child");
  let pointer = document.querySelector("li:last-child .pointer");
  currentLine.removeChild(pointer);
  // Execute Commmand
  let [func, ...arg] = command.split(" ");
  commandHistory.push(command);
  commandMap[func]
    ? commandFound(func, arg)
    : throwError(`${func}: command not found`);
  createNewPrompt();
}

/**
 * Main Script
 */

document.addEventListener("DOMContentLoaded", () => {
  createNewPrompt();

  document.addEventListener("keydown", ({ key, code }) => {
    if (code === "Enter") executeCommand();
    if (code === "Backspace") appendCommand("backspace");
    if (key.match(/\W|_|[0-9]|[[a-zA-Z]/) && key.length === 1) appendCommand(key);

    // if (code === "ArrowUp") executeCommand
  });
});
