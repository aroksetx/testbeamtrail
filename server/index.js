const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const DataBase = require('./DataBase');

DataBase.init();
app.use(bodyParser());
app.use(cors());

app.get('/phones', (req, res) => {
    res.send(DataBase.getAllData())
});

app.patch('/phones/:phoneId', (req, res) => {
    const {phoneId} = req.params;
    res.send(DataBase.updateData({id: phoneId} , req.body))
});

app.listen(3010, () => {
    console.log('Example app listening on port 3010!');
});
