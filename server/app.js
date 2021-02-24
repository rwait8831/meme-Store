const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
const dao = require('./mysqlDao.js');
//const dao = require('./sqliteDao.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/insertMeme', (request, response) => {
    dao.insertMeme(request.query.url)
    var result = "<h1>Meme Submitted</h1>"
    
    response.status(200).send(result);
});

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

app.get('/', (req, res)  => {
    
    res.status(200).sendFile('index.html')
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});