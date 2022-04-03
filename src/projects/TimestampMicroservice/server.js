const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/api/hello", (req, res) => {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:input', (req, res) => {
    const input = req.params.input;
    let unix, utc;

    if (/^\d+$/.test(input)) {
        unix = +input;
        utc = new Date(unix).toUTCString();
        res.json({ unix, utc });
        return;
    }

    if (Date.parse(input)) {
        const date = new Date(input);

        unix = date.getTime();
        utc = date.toUTCString();
        res.json({ unix, utc });
        return;
    } else {
        res.json({ error: 'Invalid Date' });
        return;
    }
});

app.get('/api', (req, res) => {
    const unix = new Date().getTime();
    const utc = new Date().toUTCString();
    res.json({ unix, utc });
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`)
});
