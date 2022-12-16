const path = require('path');
const fs = require('fs');

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
            const module = require(path.join(this.modules_path, file));
            this.modules[module.name] = module;
        });

        console.log(this.modules);
    }
}

module.exports = new BlockGenerator();