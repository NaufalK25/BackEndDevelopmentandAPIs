const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.get('/', (req, res) => {
    res.sendFile(`${process.cwd()}/views/index.html`);
});

app.post('/api/fileanalyse', multer({ storage }).single('upfile'), (req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    });
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`)
});
