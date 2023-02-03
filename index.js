const express = require('express');
var favicon = require('serve-favicon')
const path = require('path');
var fs = require('fs');
const bodyParser = require("body-parser");

const appDataPath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");

const user_blocks_path = path.join(appDataPath, 'HARDWARIO Blockly', 'blocks');
const user_categories_path = path.join(appDataPath, 'HARDWARIO Blockly', 'categories');
const user_projects_path = path.join(appDataPath, 'HARDWARIO Blockly', 'projects');
const blocks_generator = require("./generators/blocks_generator.js");
const code_generator = require("./generators/code_generator.js");

const init = () => {
  const app = express();
  const PORT = 8000;
  
  app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon', 'favicon.ico')))
  app.use(express.static(path.join(__dirname, 'static')));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('views', './views');
  app.set('view engine', 'ejs');

  blocks_generator.generate_blocks();

  app.get('/', (req, res) => {
    res.render('index', { root: __dirname, examples_list: get_examples_list(), user_projects_list: get_user_projects_list() });
  });

  app.get('/blocks_editor', (req, res) => {
    res.render('blocksEditor', { root: __dirname, project: req.query.project });
  });

  app.get('/blocks_creator', (req, res) => {
    res.render('blocksCreator', { root: __dirname });
  });

  app.get('/categories_editor', (req, res) => {
    res.render('categoriesEditor', { root: __dirname });
  });

  app.get('/yaml_editor', (req, res) => {
    if (req.query.new_user_block === "true") {
      if(!fs.existsSync(`${user_blocks_path}/${req.query.name}.yml`)){
        fs.writeFileSync(`${user_blocks_path}/${req.query.name}.yml`, "NEW_BLOCK")
      }
    }
    res.render('yamlEditor', { root: __dirname });
  });

  app.get('/parse_code', (req, res) => {
    if (req.query.Code === undefined) {
      res.send("No code to parse");
    }
    else {
      code_generator.generate_code(req.query.Code, true);
      res.send("Code parsed");
    }
  });

  app.get('/download_code', (req, res) => {
    const file = `${__dirname}/skeleton/out/debug/firmware.bin`;
    res.download(file);
  });

  app.get('/update_code', (req, res) => {
    res.send(code_generator.generate_code(req.query.Code, false));
  });

  app.get('/examples_list', (req, res) => {
    var files = fs.readdirSync(`${__dirname}/examples`);
    files.forEach(function (directory, index) {
      if (fs.existsSync(`${__dirname}/examples/${directory}/workspace.xml`)) {
        files[index] = files[index];
      }
      else {
        files.splice(index, 1);
      }
    });
    res.send(files);
  });

  app.post('/save_project', (req, res) => {
    var data = req.body.data;
    var name = req.body.name;

    if (!fs.existsSync(path.join(user_projects_path, name))) {
      fs.mkdirSync(path.join(user_projects_path, name));
    }

    fs.writeFileSync(path.join(user_projects_path, name, 'workspace.xml'), data);
    res.send("Project saved");
  });

  app.get('/load_project', (req, res) => {
    var data = fs.readFileSync(path.join(user_projects_path, req.query.name, 'workspace.xml'), 'utf8');
    res.send(data);
  });

  app.post('/save_categories', (req, res) => {
    var data = req.body.data;
    fs.writeFileSync(`${__dirname}/generators/categories/categories.yml`, data);
    res.send("Categories saved");
    blocks_generator.generate_blocks();
  });

  app.get('/load_categories', (req, res) => {
    var data = fs.readFileSync(`${__dirname}/generators/categories/categories.yml`, 'utf8');
    res.send(data);
  });

  app.get('/load_user_blocks', (req, res) => {
    var files = fs.readdirSync(user_blocks_path);
    res.send(files);
  });

  app.post('/save_user_blocks', (req, res) => {
    var data = req.body.data;
    fs.writeFileSync(`${user_blocks_path}/${req.body.name}`, data);
    res.send("User blocks saved");
    blocks_generator.generate_blocks();
    code_generator.load_all_blocks();
  });

  app.post('/save_pre_made_blocks', (req, res) => {
    var data = req.body.data;
    fs.writeFileSync(`${__dirname}/generators/blocks/${req.body.name}`, data);
    res.send("User blocks saved");
    blocks_generator.generate_blocks();
    code_generator.load_all_blocks();
  });

  app.get('/load_user_blocks_file', (req, res) => {
    var data = fs.readFileSync(`${user_blocks_path}/${req.query.name}`, 'utf8');
    res.send(data);
  });

  app.get('/load_pre_made_blocks', (req, res) => {
    var files = fs.readdirSync(`${__dirname}/generators/blocks`);
    res.send(files);
  });

  app.get('/load_pre_made_blocks_file', (req, res) => {
    var data = fs.readFileSync(`${__dirname}/generators/blocks/${req.query.name}`, 'utf8');
    res.send(data);
  });

  app.get('/get_example', (req, res) => {
    if (req.query.example === undefined) {
      res.send("No example to load");
    }
    else {
      var data = fs.readFileSync(`${__dirname}/examples/${req.query.example}/workspace.xml`, 'utf8');
      res.send(data);
    }
  });
  
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
}
if (require.main === module) {
  init()
}

function get_examples_list() {
  var files = fs.readdirSync(`${__dirname}/examples`);
  files.forEach(function (directory, index) {
    if (fs.existsSync(`${__dirname}/examples/${directory}/workspace.xml`)) {
      files[index] = files[index];
    }
    else {
      files.splice(index, 1);
    }
  });
  return files;
}

function get_user_projects_list() {
  if (!fs.existsSync(user_projects_path)) {
    fs.mkdirSync(user_projects_path);
  }
  var files = fs.readdirSync(user_projects_path);
  files.forEach(function (folder, index) {
    if (fs.existsSync(`${user_projects_path}/${folder}/workspace.xml`)) {
      files[index] = files[index];
    }
    else {
      files.splice(index, 1);
    }
  });
  return files;
}

module.exports = init;