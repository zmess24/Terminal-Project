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
            debugger;
            this.currentDir.addDir(file);
        }
    };

    changeDir(dir) {
        this.currentDir = dir;
        this.currentPath = `${dir.parentDirectory}/${dir.name}`;
    }
}

export { FileSystem };