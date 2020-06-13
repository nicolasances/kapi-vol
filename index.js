var express = require('express');
var bodyParser = require("body-parser");

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
        status: 'running',
        msg: 'All is fine man! I am up and running'
    })
});

app.listen(8080, () => {
    console.log('[kapi-base] - Up and running');
});