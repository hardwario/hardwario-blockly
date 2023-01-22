const express = require('express');
var favicon = require('serve-favicon')
const path = require('path');
var fs = require('fs');
const bodyParser = require("body-parser");

exports.init = function () {
  const blocks_generator = require("./generators/blocks_generator.js");
  const code_generator = require("./generators/code_generator.js");
  
  const app = express();
  const PORT = 8000;
  
  app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon', 'favicon.ico')))
  app.use(express.static(path.join(__dirname, 'static')));
  app.use(bodyParser.urlencoded({ extended: true }));

  blocks_generator.generate_blocks();

  app.get('/', (req, res) => {
    res.sendFile('/html/index.html', { root: __dirname });
  });

  app.get('/blocks_editor', (req, res) => {
    res.sendFile('/html/blocksEditor.html', { root: __dirname });
  });

  app.get('/blocks_creator', (req, res) => {
    res.sendFile('/html/blocksCreator.html', { root: __dirname });
  });

  app.get('/categories_editor', (req, res) => {
    res.sendFile('/html/categoriesEditor.html', { root: __dirname });
  });

  app.get('/yaml_editor', (req, res) => {
    res.sendFile('/html/yamlEditor.html', { root: __dirname });
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
    var files = fs.readdirSync(`${__dirname}/generators/user_blocks`);
    res.send(files);
  });

  app.post('/save_user_blocks', (req, res) => {
    var data = req.body.data;
    fs.writeFileSync(`${__dirname}/generators/user_blocks/${req.body.name}`, data);
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
    var data = fs.readFileSync(`${__dirname}/generators/user_blocks/${req.query.name}`, 'utf8');
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