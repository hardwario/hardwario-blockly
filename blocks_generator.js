const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

class BlockGenerator {
    constructor() {
        this.modules_path = path.join(__dirname, 'blocks');
        this.categories_path = path.join(__dirname, 'categories');

        this.modules = {};

        this.blocks = {};

        this.categories = {};

        this.load_modules();
        this.load_categories();
    }

    load_modules() {
        fs.readdirSync(this.modules_path).forEach(file => {
            let file_name = file.split('.')[0];
            let module = yaml.load(fs.readFileSync(path.join(this.modules_path, file), 'utf8'));
            console.log(file_name)
            this.modules[file_name] = module[file_name];
        });
        console.log(this.modules); 
    }

    load_categories() {
        fs.readdirSync(this.categories_path).forEach(file => {
            let file_name = file.split('.')[0];
            let category = yaml.load(fs.readFileSync(path.join(this.categories_path, file), 'utf8'));
            console.log(file_name)
            this.categories[file_name] = category[file_name];
        });
        console.log(this.categories); 
    }
}

module.exports = new BlockGenerator();