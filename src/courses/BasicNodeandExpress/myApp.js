const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
});

app.get('/json', (req, res) => {
    let message = { "message": "Hello json" }
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message['message'] = message['message'].toUpperCase();
    }
    res.json(message);
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({ time: req.time })
});

app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.send({ echo: word });
});

app
    .route('/name')
    .get((req, res) => {
        const { first, last } = req.query;
        res.send({ name: `${first} ${last}` });
    })
    .post((req, res) => {
        const { first, last } = req.body;
        res.send({ name: `${first} ${last}` });
    });

app.use(express.static(__dirname));

module.exports = app;
