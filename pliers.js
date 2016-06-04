module.exports = tasks;

var path = require('path');
var glob = require('glob');

function tasks(pliers) {
  glob.sync(path.join(__dirname, '/pliers/*.js')).forEach(function (file) {
    require(file)(pliers);
  });
}
