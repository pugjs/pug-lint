/* istanbul ignore next */
var package = require('../package.json')
  , program = require('commander')

/* istanbul ignore next */
function run(args) {

  program
    .version(package.version)
    .description(package.description)
    .parse(args)

  console.log('Linter under development')
  process.exit(0)

}

/* istanbul ignore next */
module.exports = run
