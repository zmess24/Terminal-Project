console.log("JS Loaded");

/**
 * Helper Functions + Global Variables
 */

document.addEventListener("DOMContentLoaded", () => {
    let 
        currentString = '',
        result = '';

    const commandMap = { 
        ls: 'Found LS',
        help: {}
    };

    function createNewLine() {
        let li = document.createElement('li');
        currentString = '';
        li.innerHTML = `<span class="prompt">[zacharymessinger] </span><span class="command">${currentString}</span><span class="pointer">_</span>`;
        document.querySelector('ul').appendChild(li);
    };

    function searchCommandMap() {
        let currentLine = document.querySelector('li:last-child');
        let pointer = document.querySelector('li:last-child .pointer');
        currentLine.removeChild(pointer);

        if (commandMap[currentString]) {
            console.log('found')
        } else {
            let li = document.createElement('li');
            li.innerText = `-bash: ${currentString}: command not found`
            document.querySelector('ul').appendChild(li);
            createNewLine();
        };
    };

    function appendCurrentLine(value) {
        let currentLine = document.querySelector('li:last-child .command')
        currentString = value === 'backspace' ? currentString.slice(0, currentString.length-1) : currentString + value;
        currentLine.innerText = currentString;
    };

    document.addEventListener('keydown', ({ key, code }) => {
        if (code === "Enter") searchCommandMap();
        if (code === 'Space') appendCurrentLine(' ');
        if (code === "Backspace") appendCurrentLine('backspace');
        if (code.indexOf('Key') > -1) appendCurrentLine(key);
    });

    createNewLine()
});