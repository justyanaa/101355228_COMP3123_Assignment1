const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

const DB_URL = "mongodb+srv://ib:ib@cluster0.kpg90l5.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const routes = require('./routes/routes');

app.use('/api/v1', routes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 1</h1>");
});


app.listen(8081, () => {
    console.log(`Server running at http://localhost:8081/`)
});