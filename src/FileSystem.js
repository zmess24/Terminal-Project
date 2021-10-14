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

    updatePathAndDir(dir, path = false) {
        this.currentDir = dir;
        debugger;
        this.currentPath = path ? path : `${dir.absolutePath}/${dir.name}`;
    }

    changeDir(dir) {
        let path = dir.split('/').filter(e => e !== '')

        if (path.length === 1) {
            if (path[0] === "~") {
                this.updatePathAndDir(this, "~")
            } else if (path[0] === "..") {
                this.currentDir.parentDirectory ? this.updatePathAndDir(this.currentDir.parentDirectory) : this.handleError(`cd ${dir}: End of file system`);
            } else {
                let file = this.currentDir.content.find(d => d.name === path[0]);
                file ? this.updatePathAndDir(file) : this.handleError(`cd ${dir}: No such file or directory`);
            }
        } else {
            debugger;
        }
    }
}

export { FileSystem };