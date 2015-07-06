var async = require('async')
  , fs = require('fs')
  , glob = require('glob')
  , os = require('os')

function lint(files, cb) {

  var rules = []
    , errors = []

  glob.sync(__dirname + '/rules/*.js').forEach(function (file) {
    var Rule = require(file)
      , rule = new Rule()

    rules.push(rule)
  })

  async.eachLimit(files, os.cpus().length, checkFile, function () {
    return cb(null, errors)
  })

  function checkFile(file, cb) {

    fs.readFile(file, 'utf8', function (err, data) {
      rules.forEach(function (rule) {
        rule.check(data, errors)
      })

      return cb(null, errors)
    })

  }

}

module.exports = lint
