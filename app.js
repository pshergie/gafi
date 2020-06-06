const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const app = express();
app.engine('pug', require('pug').__express)
const url = 'https://money.cnn.com/data/fear-and-greed/';
const selector = '#needleChart ul li:first-child';

fetch(url)
  .then(res => res.text())
  .then(html => {
    const $ = cheerio.load(html);
    const data = $(selector);
    const index = data.text().match(/\d+/)[0];
    const today  = new Date();

    console.log(`Fetched index: ${index}`);

    const record = { 
      index: index,
      date: today.toLocaleDateString('en-GB', { timeZone: 'UTC' }),
    };

    fs.readFile('data.json', function (err, data) {
      if (err) throw err;
      const json = JSON.parse(data);
      json.push(record);
  
      fs.writeFileSync('data.json', JSON.stringify(json));

      app.get('/', function (req, res) {
        res.render('main.pug', { data: JSON.stringify(json) });
      });
      
      app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });
    });
  }).catch((e) => {
    console.log(e);
  });
  