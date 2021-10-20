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
    }

    copyDir(source, dest) {
        let sourceArray = source.split("/").filter((e) => e !== "");
        let destArray = dest.split("/").filter((e) => e !== "");
        let sourceDir = sourceArray.length === 0 ? this.currentDir : this.findDir(sourceArray, this.currentDir, source);
        let destDir = destArray.length === 0 ? this.currentDir : this.findDir(destArray, this.currentDir, dest);
        let found = destDir.content.find(f => f.name === sourceDir.name);
        if (found) { 
            this.handleError(`cp ${source} is a directory (not copied).`);
        } else if (destDir.absolutePath === sourceDir.absolutePath) {
            this.handleError(`cp ${source}: Cannot copy directory into itself (not copied).`);
        } else {
            this.addDir(`${dest}/${sourceDir.name}`);
        }
    }
    
    moveDir(source, dest) {
        let sourceArray = source.split("/").filter((e) => e !== "");
        let destArray = dest.split("/").filter((e) => e !== "");
        let sourceDir = sourceArray.length === 0 ? this.currentDir : this.findDir(sourceArray, this.currentDir, source);
        let destDir = destArray.length === 0 ? this.currentDir : this.findDir(destArray, this.currentDir, dest);
        if (destDir.absolutePath === sourceDir.absolutePath) { 
            this.handleError(`mv ${source}: Cannot move directory into itself (not moved).`);
        } else {
            this.removeDir(source);
            this.addDir(`${dest}/${sourceDir.name}`);
        }
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
}

export { FileSystem };