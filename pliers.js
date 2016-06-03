module.exports = tasks;

var glob = require('glob');
var path = require('path');

function tasks(pliers) {
  glob.sync(path.join(__dirname, '/pliers/*.js')).forEach(function (file) {
    require(file)(pliers);
  });
}
