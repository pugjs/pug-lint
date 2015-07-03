/* istanbul ignore next */
module.exports = tasks

/* istanbul ignore next */
var glob = require('glob')

/* istanbul ignore next */
function tasks(pliers) {

  // Load pliers plugins
  glob.sync(__dirname + '/pliers/*.js').forEach(function (file) {
    require(file)(pliers)
  })

}
