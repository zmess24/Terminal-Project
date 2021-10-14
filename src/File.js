class File {
    constructor(name, parentDirectory, absolutePath, directory=false) {
        this.name = name;
        this.type = directory ? 'directory' : `.${name.split('.')[1]}`;
        this.parentDirectory = parentDirectory;
        this.absolutePath = absolutePath;
        this.content = directory ? [] : "";
    }

    addDir(dir) {
        this.content.push(dir);
    }
}

export { File };