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
    .option('-r, --reporter <reporter>', 'error reporter; console - default, inline', 'console')
    .parse(args)

  var config
    , reporter
    , linter = new Linter()

  if (!program.args.length) {
    program.help()
  }

  config = configFile.load(program.config)
  reporter = configFile.getReporter(program.reporter)

  if (!reporter.writer) {
    console.error('Reporter "' + program.reporter + '" does not exist')
    process.exit(1)
  }

  linter.configure(config)

  var errors = []

  program.args.forEach(function (arg) {
    errors = errors.concat(linter.checkPath(arg))
  })

  if (errors.length) {
    reporter.writer(errors)
    process.exit(2)
  } else {
    process.exit(0)
  }

}

/* istanbul ignore next */
module.exports = run
