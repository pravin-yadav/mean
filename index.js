const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const router = express.Router();
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

mongoose.connect(config.uri , (err) => {
    if(err){
        console.log("Could not connect to database", err);
    }else{
        console.log("mongodb connected successfully " + config.db);
    }
});
mongoose.Promise = global.Promise;

const app = express();

app.use(express.static(__dirname + '/client/dist/'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', authentication);

app.get('/', (req, res) => {
    // res.render(__dirname + '/client/dist/index.html');
    res.send("Hello World");
});

app.get('*', (req, res) => {
    res.send("Hello, still u may get  a response its  a wildcard route");
});

app.listen(8080, () => {
    console.log("Server is running on port localhost:8080");
})