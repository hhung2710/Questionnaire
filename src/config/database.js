const Sequelize = require('sequelize');

/*  
    connect to db
    const sequelize = new Sequelize(databaseName, user, password, { dialect: 'mysql', port });
    in my case user: sa and there is no password and port :3308
    remember to check your port in mysql
*/

let sequelize = new Sequelize('', 'sa', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3308,
});

sequelize.query("CREATE DATABASE IF NOT EXISTS `questionnaire`;").then((data) => {
    console.log("success");
}).catch((err) => {
    console.log(err);
});

sequelize = new Sequelize('questionnaire', 'sa', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3308,
});

module.exports = sequelize;