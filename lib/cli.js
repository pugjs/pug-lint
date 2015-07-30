/* istanbul ignore next */
var configFile = require('./config-file')
  , Linter = require('./linter')
  , package = require('../package.json')
  , program = require('commander')

/* istanbul ignore next */
function run(args) {

  program
    .version(package.version)
    .description(package.description)
    .usage('[options] <file ...>')
    .option('-c, --config <path>', 'configuration file path')
    .parse(args)

  var config
    , linter = new Linter()

  if (!program.args.length) {
    program.help()
  }

  config = configFile.load(program.config)

  linter.configure(config)

  var errors = []

  program.args.forEach(function (arg) {
    errors = errors.concat(linter.checkPath(arg))
  })

  if (errors.length) {
    var messages = []

    errors.forEach(function (error) {
      if (messages.length > 0) {
        messages.push('')
      }

      messages.push(error.message)
    })

    console.error(messages.join('\n'))
    process.exit(2)
  } else {
    process.exit(0)
  }

}

/* istanbul ignore next */
module.exports = run
