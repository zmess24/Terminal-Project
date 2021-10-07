/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

eval("console.log(\"JS Loaded 6\");\n\n// Global Varialbes\n\nlet command = '', commandHistory = [], locationMap = {\"~\": {\".bash_profile\": {}, Zac: {}}}, currentDiretory = \"~\";\n\nconst commandMap = { \n    help: {\n        desc: 'Display list of all available commands',\n        execute: help\n    },\n    clear: {\n        desc: 'Clear the command line of previous commands',\n        execute: clear\n    },\n    history: {\n        desc: 'Show history of all previous commands entered',\n        execute: history\n    },\n    ls: { \n        desc: \"List contents of current working directory\",\n        execute: ls\n    },\n    mkdir: { \n        desc: \"Make a new directory\",\n        execute: mkdir\n    },\n    cd: {\n        desc: \"Change current directory\",\n        execute: cd\n    },\n    pwd: {\n        desc: \"Print working directory\",\n        // execute: pwd\n    }\n};\n\n// Command Map Functions\n\nfunction clear() {\n    document.querySelector('ul').innerHTML = '';\n}\n\nfunction help() {\n    var commands = Object.keys(commandMap).sort();\n    createResultLine('Available Commands:');\n    let table = document.createElement('table');\n    commands.forEach(c => { \n        let row = createTableRow(c, commandMap[c].desc, \"100px\");\n        table.append(row);\n    });\n\n    createResultLine(table);\n}\n\nfunction history() {\n    let table = document.createElement('table');\n    commandHistory.forEach((c, i) => {\n        let row = createTableRow(i+1, c, \"25px\");\n        table.append(row);\n    });\n\n    createResultLine(table);\n}\n\nfunction ls() {\n    let map = currentDiretory.split('/');\n    let evalString = map.reduce((prev, curr, i) => { return prev + `map[${i}]` }, \"\")\n    debugger;\n    let files = eval(`Object.keys(locationMap[${evalString}]).sort()`);\n    let results = files.toString().replaceAll(',', '     ')\n    createResultLine(results);\n};\n\nfunction mkdir(directory) {\n    let map = currentDiretory;\n};\n\nfunction cd(path) {\n    if (locationMap[currentDiretory][path]) { \n        currentDiretory = `${currentDiretory}/${path}`;\n    } else {\n        commandNotFound(`cd: ${path}: No such file or directory`)\n    }\n};\n\n// Helper Functions\n\nfunction createNewPrompt() {\n    let li = document.createElement('li');\n    command = '';\n    li.innerHTML = `<span class=\"prompt\">[zacharymessinger] </span><span class=\"command\">${command}</span><div class=\"pointer\"></div>`;\n    document.querySelector('ul').appendChild(li);\n};\n\nfunction createResultLine(line) {\n    let li = document.createElement('li');\n    li.append(line);\n    document.querySelector('ul').appendChild(li);\n}\n\nfunction createTableCol(data) {\n    let td = document.createElement('td');\n    td.innerText = data;\n    return td;\n}\n\nfunction createTableRow(colOne, colTwo, width = null) {\n    let row = document.createElement('tr');\n    let tdOne = createTableCol(colOne);\n    let tdTwo = createTableCol(colTwo);\n    if (width) tdOne.style.width = width;\n    row.append(tdOne);\n    row.append(tdTwo);\n    return row;\n}\n\nfunction appendCommand(character) {\n    let currentLine = document.querySelector('li:last-child .command')\n    command = character === 'backspace' ? command.slice(0, command.length-1) : command + character;\n    currentLine.innerText = command;\n};\n\nfunction commandNotFound(string) {\n    let message = `-bash: ${string}`;\n    createResultLine(message);\n};\n\nfunction commandFound(command, arg) {\n    commandMap[command].execute(arg)\n};\n\nfunction executeCommand() {\n    let currentLine = document.querySelector('li:last-child');\n    let pointer = document.querySelector('li:last-child .pointer');\n    currentLine.removeChild(pointer);\n    let [func, arg] = command.split(' ');\n    commandHistory.push(func);\n    commandMap[func] ? commandFound(func, arg) : commandNotFound(`${func}: command not found`);\n    createNewPrompt();\n};\n\n/**\n * Main Script\n */\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    createNewPrompt();\n\n    document.addEventListener('keydown', ({ key, code }) => {\n        // console.log(key)\n        if (code === \"Enter\") executeCommand();\n        if (code === 'Space') appendCommand(' ');\n        if (code === \"Backspace\") appendCommand('backspace');\n        if (code.indexOf('Key') > -1) appendCommand(key);\n    });\n});\n\n//# sourceURL=webpack://terminal/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.js"]();
/******/ 	
/******/ })()
;