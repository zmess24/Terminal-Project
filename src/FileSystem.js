class FileSystem {
    constructor() {
        this.content = [];
        this.currentPath = "~";
        this.currentDir = this;
        this.currentPath = '~';
    };  

    add(file) {
        if (this.currentPath === "~") {
            this.content.push(file);
        } else {
            this.currentDir.addDir(file);
        }
    };

    changeDir(dir) {
        debugger;
        this.currentDir = dir;
        this.currentPath = `${dir.parentDirectory}/${dir.name}`;
    }
}

export { FileSystem };