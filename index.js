const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express();

app.get('/article', (req, res) => {
  superagent.get('https://meiriyiwen.com/random').end((err, response) => {
    if (err) {
      res.send({ title:"抱歉", content:"发生了错误,请刷新重试" });
    }
    const $ = cheerio.load(response.text);
    const title = $('#article_show h1').text().trim();
    const author = $('#article_show .article_author').text().trim();
    const content = $('#article_show .article_text').html();
    res.send({ title,author, content });
  });
});

app.listen(3000, () => {
  console.log('app is listening at port 3000');
});
