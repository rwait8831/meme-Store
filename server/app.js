const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
const multer = require('multer');
const dao = require('./mysqlDao.js');
//const dao = require('./sqliteDao.js');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

var upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Images and GIFs only, please'));
        }
    }
})

app.get('/insertMeme', (request, response) => {
    dao.insertMeme(request.query.url)
    var result = "<h1>Meme Submitted</h1>"
    
    response.status(200).send(result);
});

app.get('/getMeme', async (request, response) => {
    var url = await dao.getMeme();
    var result = "<img id = 'meme' src ='"+url+"' alt = 'meme'>"
    response.status(200).send(result);
})

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

app.post('/putMeme', upload.single('meme'), function(request, response){
    dao.insertFile(request.file.filename);
    response.status(200).send("Inserted new file: " + request.file.filename);
});

app.get('/retMeme', async function (req, res) {

    var meme = await dao.retMeme();
    console.log("trying to send the file " + meme);
    res.status(200).sendFile(__dirname + "/uploads/" + meme);
});

app.get('/', (req, res)  => {
    res.status(200).sendFile('index.html', {
        root: path.resolve(__dirname + '/index.html')
    });
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});