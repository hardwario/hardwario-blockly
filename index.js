const express = require('express');
const blocks_generator = require("./blocks_generator.js");
const app = express();
const PORT = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  let block_generator = new BlockGenerator();
  res.sendFile('/html/index.html', { root: __dirname });
});

app.get('/parse_code', (req, res) => {
  res.sendFile('/html/test.html', { root: __dirname });
});

app.get('/download_code', (req, res) => {
  res.sendFile('/html/download.html', { root: __dirname });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));