import { File } from "./File";

class FileSystem {
    constructor() {
        this.content = [];
        this.name = '~';
        this.currentPath = "~";
        this.absolutePath = "~";
        this.currentDir = this;
    };
    
    // Helper Methods
    handleError = (message) => {
        throw new Error(message)
    }

    addDir(filePath) {
        let pathArray = filePath.split("/").filter((e) => e !== "");
        let fileName = pathArray.pop();
        let dir = pathArray.length === 0 ? this.currentDir : this.findDir(pathArray, this.currentDir, filePath);
        let newFile = new File(fileName, dir, `${dir.absolutePath}/${fileName}`, true);
        dir.name === "~" ? this.content.push(newFile) : dir.addDir(newFile);
    };

    removeDir(filePath) {
        let pathArray = filePath.split("/").filter((e) => e !== "");
        let dir = pathArray.length === 1 && pathArray[0] === "~"
            ? this.handleError(`rm ${filePath}: Cannot delete file system`)
            : this.findDir(pathArray, this.currentDir, filePath);
        
        dir.parentDirectory.content = dir.parentDirectory.content.filter(f => f.name !== dir.name)
        debugger;
    }

    updatePathAndCurrentDir(dir) {
        this.currentDir = dir;
        this.currentPath = dir.name === "~" ? "~" : `${this.currentDir.absolutePath}`;
    }

    findDir(pathArray, currentDir, absolutePath) {
        currentDir = currentDir ? currentDir : this.currentDir;

        if (pathArray[0] === "~") {
            currentDir = this;
        } else if (pathArray[0] === "..") {
            currentDir.parentDirectory && currentDir.name !== "~"
                ? currentDir = currentDir.parentDirectory
                : this.handleError(`cd ${absolutePath}: End of file system`);
        } else {
            let file = currentDir.content.find(d => d.name === pathArray[0]);
            file ? currentDir = file : this.handleError(`cd ${absolutePath}: No such file or directory`);
        };

        pathArray.shift();
        return pathArray.length > 0 ? this.findDir(pathArray, currentDir, absolutePath) : currentDir;
    }

    changeDir(absolutePath) {
        let pathArray = absolutePath.split("/").filter((e) => e !== "");
        let dir = pathArray.length === 1 && pathArray[0] === "~"
            ? this 
            : this.findDir(pathArray, this.currentDir, absolutePath);

        this.updatePathAndCurrentDir(dir);
    }

    move(sourceAndPath) {
        let [source, path] = sourceAndPath;
        debugger;
    }
}

export { FileSystem };