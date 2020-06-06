// импорт библиотек
const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express(); // инициализируем express (что это? https://expressjs.com/ru/)
const url = ''; // адрес нужного сайта
const selector = '#needleChart ul li:first-child'; // необходимый элемент на странице

// вызываем функцию, которая делает основную работу
fetch(url)
  .then(res => res.text())
  .then(html => {
    const $ = cheerio.load(html);
    const data = $(selector);
    const index = data.text().match(/\d+/)[0];
    const today = new Date();
    const date = today.toLocaleDateString('en-GB', { timeZone: 'UTC' })

    console.log(`Fetched index: ${index}`);

    const newRecord = { 
      index: index,
      date: date,
    };

    fs.readFile('data.json', function (err, data) {
      if (err) throw err;
      const json = JSON.parse(data);

      if (json[json.length - 1].date !== date) {
        json.push(newRecord);
        fs.writeFileSync('data.json', JSON.stringify(json));
      }

      app.get('/', function (req, res) {
        res.render('main.pug', { data: JSON.stringify(json) });
      });
      
      app.listen(3000, function () {
        console.log('App listening on port 3000');
      });
    });
  }).catch((e) => {
    console.log(e);
  });
  