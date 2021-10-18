class FileSystem {
    constructor() {
        this.content = [];
        this.name = '~';
        this.currentPath = "~";
        this.absolutePath = "~";
        this.currentDir = this;
    };  

    handleError(message) {
        throw new Error(message)
    }

    add(file) {
        if (this.currentPath === "~") {
            this.content.push(file);
        } else {
            this.currentDir.addDir(file);
        }
    };

    updatePathAndCurrentDir(dir) {
        this.currentDir = dir;
        this.currentPath = dir.name === "~" ? "~" : `${dir.absolutePath}/${dir.name}`;
    }

    changeDir(pathArray, currentDir, absolutePath) {
        currentDir = currentDir ? currentDir : this.currentDir;
        if (pathArray[0] === "~") {
            currentDir = this;
        } else if (pathArray[0] === "..") {
            debugger;
            currentDir.parentDirectory && currentDir.name !== "~"
                ? currentDir = currentDir.parentDirectory
                : this.handleError(`cd ${absolutePath}: End of file system`);
        } else {
            let file = currentDir.content.find(d => d.name === pathArray[0]);
            file ? currentDir = file : this.handleError(`cd ${absolutePath}: No such file or directory`);
        }
        pathArray.shift();
        return pathArray.length > 0 ? this.changeDir(pathArray, currentDir, absolutePath) : this.updatePathAndCurrentDir(currentDir);
    }
}

export { FileSystem };