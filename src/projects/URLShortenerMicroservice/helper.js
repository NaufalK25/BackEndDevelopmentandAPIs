const fs = require('fs');

const createFile = (file) => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '[]');
    }
}

const insertUrl = (file, inputUrl) => {
    const urls = JSON.parse(fs.readFileSync(file));

    if (checkUrl(file, inputUrl)) {
        const foundUrl = findUrl(file, inputUrl);
        return foundUrl;
    }

    const newUrl = {
        original_url: inputUrl,
        short_url: getUrlLength(file) + 1,
    }

    urls.push(newUrl);
    fs.writeFileSync(file, JSON.stringify(urls));
    return newUrl;
}

const checkUrl = (file, inputUrl) => {
    const foundUrl = findUrl(file, inputUrl);
    return foundUrl ? true : false;
}

const findUrl = (file, inputUrl) => {
    const urls = JSON.parse(fs.readFileSync(file));
    return urls.find(url => url.original_url === inputUrl);
}

const findByShortUrl = (file, shortUrl) => {
    const urls = JSON.parse(fs.readFileSync(file));
    return urls.find(url => url.short_url === +shortUrl);
}

const getUrlLength = (file) => {
    const urls = JSON.parse(fs.readFileSync(file));
    return urls.length;
}

module.exports = {
    createFile,
    insertUrl,
    checkUrl,
    findUrl,
    findByShortUrl,
    getUrlLength,
}
