/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/File.js":
/*!*********************!*\
  !*** ./src/File.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"File\": () => (/* binding */ File)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar File = /*#__PURE__*/function () {\n  function File(name, parentDirectory, absolutePath) {\n    var directory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n\n    _classCallCheck(this, File);\n\n    this.name = name;\n    this.type = directory ? 'directory' : \".\".concat(name.split('.')[1]);\n    this.parentDirectory = parentDirectory;\n    this.absolutePath = absolutePath;\n    this.content = directory ? [] : \"\";\n  }\n\n  _createClass(File, [{\n    key: \"addDir\",\n    value: function addDir(dir) {\n      this.content.push(dir);\n    }\n  }]);\n\n  return File;\n}();\n\n\n\n//# sourceURL=webpack://terminal/./src/File.js?");

/***/ }),

/***/ "./src/FileSystem.js":
/*!***************************!*\
  !*** ./src/FileSystem.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FileSystem\": () => (/* binding */ FileSystem)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar FileSystem = /*#__PURE__*/function () {\n  function FileSystem() {\n    _classCallCheck(this, FileSystem);\n\n    this.content = [];\n    this.name = '~';\n    this.currentPath = \"~\";\n    this.absolutePath = \"~\";\n    this.currentDir = this;\n  }\n\n  _createClass(FileSystem, [{\n    key: \"handleError\",\n    value: function handleError(message) {\n      throw new Error(message);\n    }\n  }, {\n    key: \"add\",\n    value: function add(file) {\n      if (this.currentPath === \"~\") {\n        this.content.push(file);\n      } else {\n        this.currentDir.addDir(file);\n      }\n    }\n  }, {\n    key: \"updatePathAndCurrentDir\",\n    value: function updatePathAndCurrentDir(dir) {\n      this.currentDir = dir;\n      this.currentPath = dir.name === \"~\" ? \"~\" : \"\".concat(dir.absolutePath, \"/\").concat(dir.name);\n    }\n  }, {\n    key: \"changeDir\",\n    value: function changeDir(pathArray, currentDir, absolutePath) {\n      currentDir = currentDir ? currentDir : this.currentDir;\n\n      if (pathArray[0] === \"~\") {\n        currentDir = this;\n      } else if (pathArray[0] === \"..\") {\n        currentDir.parentDirectory && currentDir.name !== \"~\" ? currentDir = currentDir.parentDirectory : this.handleError(\"cd \".concat(absolutePath, \": End of file system\"));\n      } else {\n        var file = currentDir.content.find(function (d) {\n          return d.name === pathArray[0];\n        });\n        file ? currentDir = file : this.handleError(\"cd \".concat(absolutePath, \": No such file or directory\"));\n      }\n\n      ;\n      pathArray.shift();\n      return pathArray.length > 0 ? this.changeDir(pathArray, currentDir, absolutePath) : this.updatePathAndCurrentDir(currentDir);\n    }\n  }]);\n\n  return FileSystem;\n}();\n\n\n\n//# sourceURL=webpack://terminal/./src/FileSystem.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _File__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./File */ \"./src/File.js\");\n/* harmony import */ var _FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileSystem */ \"./src/FileSystem.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nconsole.log(\"JS Loaded\");\n\n // Global Varialbes\n\nvar command = \"\",\n    commandHistory = [];\nvar map = new _FileSystem__WEBPACK_IMPORTED_MODULE_1__.FileSystem();\nmap.add(new _File__WEBPACK_IMPORTED_MODULE_0__.File(\"Zac\", map.currentDir, \"~\", true));\nmap.add(new _File__WEBPACK_IMPORTED_MODULE_0__.File(\".bash_profile\", map.currentDir, \"~\"));\nconsole.log(map.directory);\nvar commandMap = {\n  help: {\n    desc: \"Display list of all available commands\",\n    execute: help\n  },\n  clear: {\n    desc: \"Clear the command line of previous commands\",\n    execute: clear\n  },\n  history: {\n    desc: \"Show history of all previous commands entered\",\n    execute: history\n  },\n  ls: {\n    desc: \"List contents of current working directory\",\n    execute: ls\n  },\n  mkdir: {\n    desc: \"Make a new directory\",\n    execute: mkdir\n  },\n  cd: {\n    desc: \"Change current directory\",\n    execute: cd\n  },\n  pwd: {\n    desc: \"Print working directory\" // execute: pwd\n\n  }\n}; // Command Map Functions\n\nfunction clear() {\n  document.querySelector(\"ul\").innerHTML = \"\";\n}\n\nfunction help() {\n  var commands = Object.keys(commandMap).sort();\n  createResultLine(\"Available Commands:\");\n  var table = document.createElement(\"table\");\n  commands.forEach(function (c) {\n    var row = createTableRow(c, commandMap[c].desc, \"100px\");\n    table.append(row);\n  });\n  createResultLine(table);\n}\n\nfunction history() {\n  var table = document.createElement(\"table\");\n  commandHistory.forEach(function (c, i) {\n    var row = createTableRow(i + 1, c, \"25px\");\n    table.append(row);\n  });\n  createResultLine(table);\n}\n\nfunction ls() {\n  var results = map.currentDir.content.reduce(function (prev, curr) {\n    return \"\".concat(prev, \" \").concat(curr.name);\n  }, \"\");\n  createResultLine(results);\n}\n\nfunction mkdir(name) {\n  var file = new _File__WEBPACK_IMPORTED_MODULE_0__.File(name, map.currentDir, map.currentPath, true);\n  map.add(file);\n}\n\nfunction cd(absolutePath) {\n  var pathArray = absolutePath.split(\"/\").filter(function (e) {\n    return e !== \"\";\n  });\n\n  try {\n    pathArray.length === 1 && pathArray[0] === \"~\" ? map.updatePathAndCurrentDir(map) : map.changeDir(pathArray, map.currentDir, absolutePath, true);\n  } catch (err) {\n    throwError(err.message);\n  }\n} // Helper Functions\n\n\nfunction createNewPrompt() {\n  var li = document.createElement(\"li\");\n  command = \"\";\n  li.innerHTML = \"<span class=\\\"prompt\\\">[zacharymessinger] <span class=\\\"currentPath\\\">\".concat(map.currentPath, \"</span> </span><span class=\\\"command\\\">\").concat(command, \"</span> <div class=\\\"pointer\\\"></div>\");\n  document.querySelector(\"ul\").appendChild(li);\n}\n\nfunction createResultLine(line) {\n  var li = document.createElement(\"li\");\n  li.append(line);\n  document.querySelector(\"ul\").appendChild(li);\n}\n\nfunction createTableCol(data) {\n  var td = document.createElement(\"td\");\n  td.innerText = data;\n  return td;\n}\n\nfunction createTableRow(colOne, colTwo) {\n  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var row = document.createElement(\"tr\");\n  var tdOne = createTableCol(colOne);\n  var tdTwo = createTableCol(colTwo);\n  if (width) tdOne.style.width = width;\n  row.append(tdOne);\n  row.append(tdTwo);\n  return row;\n}\n\nfunction appendCommand(key) {\n  var currentLine = document.querySelector(\"li:last-child .command\");\n  command = key === \"backspace\" ? command.slice(0, command.length - 1) : command + key;\n  currentLine.textContent = command;\n}\n\nfunction throwError(string) {\n  var message = \"-bash: \".concat(string);\n  createResultLine(message);\n}\n\nfunction commandFound(command, arg) {\n  commandMap[command].execute(arg);\n}\n\nfunction executeCommand() {\n  // Remove cursor from current line\n  var currentLine = document.querySelector(\"li:last-child\");\n  var pointer = document.querySelector(\"li:last-child .pointer\");\n  currentLine.removeChild(pointer); // Execute Commmand\n\n  var _command$split = command.split(\" \"),\n      _command$split2 = _slicedToArray(_command$split, 2),\n      func = _command$split2[0],\n      arg = _command$split2[1];\n\n  commandHistory.push(command);\n  commandMap[func] ? commandFound(func, arg) : throwError(\"\".concat(func, \": command not found\"));\n  createNewPrompt();\n}\n/**\n * Main Script\n */\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  createNewPrompt();\n  document.addEventListener(\"keydown\", function (_ref) {\n    var key = _ref.key,\n        code = _ref.code;\n    if (code === \"Enter\") executeCommand();\n    if (code === \"Backspace\") appendCommand(\"backspace\");\n    if (key.match(/\\W|_|[0-9]|[[a-zA-Z]/) && key.length === 1) appendCommand(key);\n  });\n});\n\n//# sourceURL=webpack://terminal/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;