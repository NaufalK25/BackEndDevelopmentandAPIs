require('dotenv').config();
const express = require('express');
const cors = require('cors');
const validUrl = require('valid-url');
const { createFile, insertUrl, findByShortUrl } = require('./helper');

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

createFile('urls.json');

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:short_url', (req, res) => {
    const redirectedUrl = findByShortUrl('urls.json', req.params.short_url);
    res.redirect(redirectedUrl['original_url']);
});

app.post('/api/shorturl', (req, res) => {
    let url = req.body.url.replace(/\/$/, '');
    if (validUrl.isWebUri(url)) {
        const data = insertUrl('urls.json', url);
        res.json(data);
    } else {
        res.json({ error: 'invalid url' });
    }
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
