var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');

app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-correlation-id, x-msg-id");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    next();
});

app.use(bodyParser.json());

// APIS
app.get('/status', (req, res) => {

    res.status(200).type('application/json').send({
        name: 'kapi-vol',
        status: 'running',
        msg: 'All is fine man! I am up and running'
    })
});

app.post('/data', (req, res) => {

    let home = process.env['HOME'];
    let folderName = 'my-data';

    let dir = home + '/' + folderName;

    if (!fs.existsSync(dir)) {
        console.log("[kapi-vol] - Creating " + dir);
        fs.mkdirSync(dir);
    }

    fs.writeFile(dir + '/helloworld.txt', 'Hello World!', function (err) {
        if (err) {
            res.status(500).type('application/json').send({ written: false, error: err })
            return;
        }

        res.status(200).type('application/json').send({ written: true })
    });
});

app.listen(8080, () => {
    console.log('[kapi-vol] - Up and running');
});