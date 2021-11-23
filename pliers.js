module.exports = tasks;

const path = require('path');
const glob = require('glob');

function tasks(pliers) {
  for (const file of glob.sync(path.join(__dirname, '/pliers/*.js'))) {
    require(file)(pliers);
  }
}
