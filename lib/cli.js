#!/usr/bin/env node
var program = require('commander');
var packageDetails = require('../package.json');
var configFile = require('./config-file');
var Linter = require('./linter');

function run(args) {
  program
    .version(packageDetails.version)
    .description(packageDetails.description)
    .usage('[options] <file ...>')
    .option('-c, --config <path>', 'configuration file path')
    .option('-r, --reporter <reporter>', 'error reporter; console - default, inline', 'console')
    .parse(args);

  var config;
  var reporter;
  var linter = new Linter();
  var errors = [];

  if (!program.args.length) {
    program.help();
  }

  config = configFile.load(program.config);
  reporter = configFile.getReporter(program.reporter);

  if (!reporter.writer) {
    console.error('Reporter "' + program.reporter + '" does not exist');
    process.exit(1);
  }

  linter.configure(config);

  program.args.forEach(function (arg) {
    errors = errors.concat(linter.checkPath(arg));
  });

  if (errors.length) {
    reporter.writer(errors);
    process.exit(2);
  } else {
    process.exit(0);
  }
}

module.exports = run;
