const express = require('express');
const app = express();
const config = require('./config/config');
const sequelize = require('./config/database');
const routes = require('./view/router');

app.use(express.json());

sequelize.sync();

app.use('/test',routes);

app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
})