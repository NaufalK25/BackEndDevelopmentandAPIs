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

app.get('/api/whoami', (req, res) => {
    res.json({
        "ipaddress": req.ip,
        "language": req.headers["accept-language"],
        "software": req.headers["user-agent"],
    });
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`)
});
