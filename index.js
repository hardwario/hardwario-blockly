const express = require('express');
const blocks_generator = require("./blocks_generator.js");
const code_generator = require("./code_generator.js");
const app = express();
const PORT = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile('/html/index.html', { root: __dirname });
});

app.get('/parse_code', (req, res) => {
  if(req.query.Code === undefined){
    res.send("No code to parse");
  }
  else{
    code_generator.generate_code(req.query.Code, true);
    res.send("Code parsed");
  }
});

app.get('/download_code', (req, res) => {
  res.send('Download');
});

app.get('/update_code', (req, res) => {
  res.send(code_generator.generate_code(req.query.Code, false));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));