/* istanbul ignore next */
var jadelint = require('../lib/jadelint')
  , package = require('../package.json')
  , program = require('commander')

/* istanbul ignore next */
function run(args) {

  program
    .version(package.version)
    .description(package.description)
    .parse(args)

  jadelint(function (err, result) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log('Linter under development')
    process.exit(result ? 0 : 2)

  })

}

/* istanbul ignore next */
module.exports = run
