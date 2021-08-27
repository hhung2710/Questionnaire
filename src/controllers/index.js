const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const controller = {};
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
  const split = file.split('.');
  const fileName = split[0];
  const link = require(path.join(__dirname, file));
  controller[fileName] = link;
});


module.exports = controller;
