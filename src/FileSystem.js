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

    changeDir(pathArray, currentDir, absolutePath, firstIteration) {
        currentDir = currentDir ? currentDir : this.currentDir;
        debugger;
        if (pathArray[0] === "~") {
            currentDir = this;
        } else if (pathArray[0] === "..") {
            if (this.currentDir.parentDirectory && this.currentDir.name !== "~") {
                currentDir = currentDir.parentDirectory
            } else {
                this.handleError(`cd ${absolutePath}: End of file system`);
            }
        } else {
            let file = currentDir.content.find(d => d.name === pathArray[0]);
            debugger;
            if (file) {
                currentDir = file
            } else {
                this.handleError(`cd ${absolutePath}: No such file or directory`);
            } 
        }
        debugger;
        pathArray.shift();
        return pathArray.length > 0 ? this.changeDir(pathArray, currentDir, absolutePath) : this.updatePathAndCurrentDir(currentDir);
    }
}

export { FileSystem };