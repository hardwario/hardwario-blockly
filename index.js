const express = require('express');
var favicon = require('serve-favicon')
const path = require('path');
var fs = require('fs');
const bodyParser = require("body-parser");
const openExplorer = require('open-file-explorer');

const appDataPath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");

const user_folder = path.join(appDataPath, 'HARDWARIO Blockly');
const user_blocks_folder_path = path.join(user_folder, 'blocks');
const user_categories_folder_path = path.join(user_folder, 'categories');
const user_categories_path = path.join(user_categories_folder_path, 'categories.yml');
const user_projects_folder_path = path.join(user_folder, 'projects');
setup_folders();

const blocks_generator = require("./generators/blocks_generator.js");
const code_generator = require("./generators/code_generator.js");

const init = () => {
  const app = express();
  const PORT = 8000;

  app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon', 'favicon.ico')))
  app.use(express.static(path.join(__dirname, 'static')));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  blocks_generator.generate_blocks();

  app.get('/', (req, res) => {
    res.render('index', { root: __dirname, examples_list: get_examples_list(), user_projects_list: get_user_projects_list() });
  });

  app.get('/blocks_editor', (req, res) => {
    res.render('blocksEditor', { root: __dirname, project: req.query.project, example: req.query.example });
  });

  app.get('/blocks_creator', (req, res) => {
    res.render('blocksCreator', { root: __dirname, user_blocks_list: get_user_blocks_list(), pre_made_blocks_list: get_pre_made_blocks_list() });
  });

  app.get('/categories_editor', (req, res) => {
    res.render('categoriesEditor', { root: __dirname });
  });

  app.get('/yaml_editor', (req, res) => {
    if (req.query.new_user_block === "true") {
      if (!fs.existsSync(`${user_blocks_folder_path}/${req.query.name}.yml`)) {
        fs.writeFileSync(`${user_blocks_folder_path}/${req.query.name}.yml`, "NEW_BLOCK")
      }
    }
    res.render('yamlEditor', { root: __dirname, user_block: req.query.user_block, pre_made_block: req.query.pre_made_block });
  });

  app.post('/parse_code', async (req, res) => {
    if (req.body.Code === undefined) {
      res.send("No code to parse");
    }
    else {
      await code_generator.generate_code(req.body.Code, true);
      res.send(path.join(__dirname, 'skeleton', 'firmware.bin'));
    }
  });

  app.post('/create_project_from_example', (req, res) => {
    var data = req.body.data;
    var name = req.body.name + '_example';

    if (!fs.existsSync(path.join(user_projects_folder_path, name))) {
      fs.mkdirSync(path.join(user_projects_folder_path, name));
    }

    fs.writeFileSync(path.join(user_projects_folder_path, name, 'workspace.xml'), data);
    res.send("Project created");
  });


  app.get('/download_code', (req, res) => {
    const file = `${__dirname}/skeleton/out/debug/firmware.bin`;
    res.download(file);
  });

  app.post('/update_code', async (req, res) => {
    try {
      let code = await code_generator.generate_code(req.body.Code, false);
      res.send(code);
    }
    catch (e) {
      console.log(e);
      res.send("Parsing code error.\nTry fixing the latest added block");
    }
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

    if (!fs.existsSync(path.join(user_projects_folder_path, name))) {
      fs.mkdirSync(path.join(user_projects_folder_path, name));
    }

    fs.writeFileSync(path.join(user_projects_folder_path, name, 'workspace.xml'), data);
    res.send("Project saved");
  });

  app.get('/load_project', (req, res) => {
    var data = fs.readFileSync(path.join(user_projects_folder_path, req.query.name, 'workspace.xml'), 'utf8');
    res.send(data);
  });

  app.get('/delete_project', (req, res) => {
    fs.rmdirSync(path.join(user_projects_folder_path, req.query.project), { recursive: true });
    res.send("Project deleted");
  });

  app.get('/load_example', (req, res) => {
    console.log(`${__dirname}/examples/${req.query.name}/workspace.xml`);
    var data = fs.readFileSync(`${__dirname}/examples/${req.query.name}/workspace.xml`, 'utf8');
    console.log(data);
    res.send(data);
  });

  app.post('/save_categories', (req, res) => {
    var data = req.body.data;
    fs.writeFileSync(user_categories_path, data);
    res.send("Categories saved");
    blocks_generator.generate_blocks();
  });

  app.get('/load_categories', (req, res) => {
    var data = fs.readFileSync(user_categories_path, 'utf8');
    res.send(data);
  });

  app.post('/save_user_block', (req, res) => {
    var data = req.body.data;
    var name = req.body.name;

    fs.writeFileSync(path.join(user_blocks_folder_path, name), data);
    res.send("User blocks saved");

    blocks_generator.generate_blocks();
    code_generator.load_all_blocks();
  });

  app.get('/delete_user_block', (req, res) => {
    fs.unlinkSync(path.join(user_blocks_folder_path, req.query.name));
    blocks_generator.generate_blocks();
    code_generator.load_all_blocks();

    res.send("User blocks deleted");
  });

  app.post('/save_pre_made_blocks', (req, res) => {
    var data = req.body.data;
    fs.writeFileSync(`${__dirname}/generators/blocks/${req.body.name}`, data);
    res.send("User blocks saved");
    blocks_generator.generate_blocks();
    code_generator.load_all_blocks();
  });

  app.get('/load_user_block', (req, res) => {
    var data = fs.readFileSync(`${user_blocks_folder_path}/${req.query.name}`, 'utf8');
    res.send(data);
  });

  app.get('/load_pre_made_blocks', (req, res) => {
    var files = fs.readdirSync(`${__dirname}/generators/blocks`);
    res.send(files);
  });

  app.get('/load_pre_made_block', (req, res) => {
    var data = fs.readFileSync(`${__dirname}/generators/blocks/${req.query.name}`, 'utf8');
    res.send(data);
  });

  app.get('/open_user_folder', (req, res) => {
    openExplorer(user_folder);
    res.send("User folder opened");
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
  if (!fs.existsSync(user_projects_folder_path)) {
    fs.mkdirSync(user_projects_folder_path);
  }
  var files = fs.readdirSync(user_projects_folder_path);
  files.forEach(function (folder, index) {
    if (fs.existsSync(`${user_projects_folder_path}/${folder}/workspace.xml`)) {
      files[index] = files[index];
    }
    else {
      files.splice(index, 1);
    }
  });
  return files;
}

function get_user_blocks_list() {
  if (!fs.existsSync(user_blocks_folder_path)) {
    fs.mkdirSync(user_blocks_folder_path);
  }
  var files = fs.readdirSync(user_blocks_folder_path);
  return files;
}

function get_pre_made_blocks_list() {
  var files = fs.readdirSync(`${__dirname}/generators/blocks`);
  return files;
}

function setup_folders() {
  if (!fs.existsSync(user_folder)) {
    fs.mkdirSync(user_folder);
  }
  if (!fs.existsSync(user_blocks_folder_path)) {
    fs.mkdirSync(user_blocks_folder_path);
  }
  if (!fs.existsSync(user_categories_folder_path)) {
    fs.mkdirSync(user_categories_folder_path);
  }
  if (!fs.existsSync(user_categories_path)) {
    let data = "---\ncategories:\n  ";
    fs.writeFileSync(user_categories_path, data);
  }
  if (!fs.existsSync(user_projects_folder_path)) {
    fs.mkdirSync(user_projects_folder_path);
  }
}

module.exports = { init };