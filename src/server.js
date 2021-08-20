const express = require('express');
const app = express();
const config = require('./config/config');
const sequelize = require('./config/database');
const db = require('./models/index');

const account  = db.account;
const question = db.question;

app.use(express.json());

sequelize.sync();
app.listen(config.port, ()=>{
    console.log(`Listening to port ${config.port}`);
})