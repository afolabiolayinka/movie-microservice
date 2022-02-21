const express = require('express')
const app = express()
const port = 8080

const bodyParser = require("body-parser");

app.use(express.json());

const appDatabase = require('./database');
const route = require('./route');

appDatabase.serialize(function () {
appDatabase.run('CREATE TABLE Movies (Title TEXT,Released TEXT,Genre TEXT,Director TEXT, CreatedAt DATE, CreatedBy INT)')
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(route);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;